# abb-extension <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" height="20" />

Adds magnet links to audiobook bay

![Copy magnet link](.github/copy-magnet-link.gif)

## Installation

### Firefox 🚤

1. Go to https://github.com/benjick/abb-extension/releases
2. Click on the `[id]-[version].xpi` file
3. Click "Continue to Installation" in the popup followed by "Add"

## Development

1. Install dependecies: `pnpm i`
2. Start file-watcher and launch firefox: `pnpm dev`
3. You can also launch chrome/chromium with `pnpm chromium`

> ❗ To be able to run chrome/chromium you probably will have to `cp .env.example .env` and adjust the `CHROME_PATH` variable.
