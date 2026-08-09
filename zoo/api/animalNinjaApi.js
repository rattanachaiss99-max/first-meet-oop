const { existsSync, readFileSync } = require("node:fs");
const { join } = require("node:path");

const API_NINJAS_URL = "https://api.api-ninjas.com/v1/animals";
const ENV_FILE_PATH = join(__dirname, "..", "..", ".env");

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function loadEnvFile() {
  if (!existsSync(ENV_FILE_PATH)) {
    return;
  }

  const envLines = readFileSync(ENV_FILE_PATH, "utf8").split(/\r?\n/);

  envLines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = stripWrappingQuotes(
      trimmedLine.slice(separatorIndex + 1).trim(),
    );

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

async function fetchAnimalFromApiNinjas(name) {
  loadEnvFile();
  const apiKey = process.env.API_NINJAS_KEY?.trim();

  if (!apiKey || apiKey === "put_your_api_ninjas_key_here") {
    throw new Error("Missing API_NINJAS_KEY environment variable.");
  }

  if (!name || !name.trim()) {
    throw new Error("Animal name is required.");
  }

  const url = `${API_NINJAS_URL}?name=${encodeURIComponent(name.trim())}`;
  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();

    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Invalid API_NINJAS_KEY. Check the key in .env, remove any extra spaces or quotes, and regenerate the key from API Ninjas if needed.",
      );
    }

    throw new Error(
      `API Ninjas request failed with ${response.status}: ${errorBody || "Unknown error"}`,
    );
  }

  const animals = await response.json();

  if (!Array.isArray(animals) || animals.length === 0) {
    throw new Error(`No animals found for "${name.trim()}".`);
  }

  return animals[0];
}

module.exports = {
  fetchAnimalFromApiNinjas,
};
