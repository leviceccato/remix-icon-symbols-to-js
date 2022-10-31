# Remix Icon Symbols to JS

Simple script to generate JS constants from Remix Icon SVG symbols.

## Requirements

- Node 16

## Usage

Install dependencies.

`npm i`

Build into `out.js`.

`npm run build`

Copy the contents of `out.js` into the frontend.

To change the version of Remix used you must edit `version` in `build.js`.

You can also add icons to be exported by editing `iconsToExport`.
