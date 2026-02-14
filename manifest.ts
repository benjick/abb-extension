import pkg from "./package.json";
import { writeFileSync } from "fs";

const manifest = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  manifest_version: 3,
  homepage_url: "https://github.com/benjick/abb-extension",
  icons: {
    "48": "icons/abb.png",
  },
  permissions: ["clipboardWrite"],
  browser_specific_settings: {
    gecko: {
      id: "abb-extension@benjick.se",
      strict_min_version: "58.0",
      data_collection_permissions: {
        collectsTechnicalData: false,
        collectsInteractionData: false,
      },
    },
  },
  content_scripts: [
    {
      matches: ["*://*.audiobookbay.lu/*"],
      js: ["dist/bundle/bundle.js"],
    },
  ],
};

writeFileSync("./manifest.json", JSON.stringify(manifest, null, 2));
