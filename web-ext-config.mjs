import "dotenv/config";

/** @type {import('./src/types/web-ext-config').WebExtConfig} */
const config = {
  verbose: false,
  ignoreFiles: [
    ".github",
    "api",
    "browser-profiles",
    "dist/artifacts",
    "dist/js",
    "rollup.config.js",
    "src",
    "web-ext-config.js",
    "yarn.lock",
  ],
  artifactsDir: "dist/artifacts",
  build: {
    overwriteDest: false, // TODO: Check if CI
  },
  run: {
    profileCreateIfMissing: true,
    firefoxProfile: "./browser-profiles/firefox",
    chromiumProfile: "./browser-profiles/chromium",
    keepProfileChanges: true,
    watchFile: ["dist/bundle/bundle.js"],
    browserConsole: false,
    startUrl: ["https://audiobookbay.lu"],
  },
  lint: {
    selfHosted: true,
  },
  sign: {
    apiKey: process.env.AMO_JWT_ISSUER ?? "",
    apiSecret: process.env.AMO_JWT_SECRET ?? "",
    channel: "unlisted",
    // amoMetadata: "metadata.json",
  },
};

export default config;
