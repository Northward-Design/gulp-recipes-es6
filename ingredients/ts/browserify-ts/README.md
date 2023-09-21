Browserify TS Ingredient
================================================================================

A Browserify TS Task.

- Bundles `index.ts` in `src/js` with required files to `dist/styles`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { dest } = gulp;
import { default as pump } from 'pump-promise';
import { default as source } from 'vinyl-source-stream';

import { default as browserify } from 'browserify';
import { default as tsify } from 'tsify';

export default function buildTs() {
  return pump(
    browserify({
    	entries: ['src/ts/index.ts']
    })
    .plugin(tsify)
    .bundle(),
    source('index.js'),
    dest('dist/scripts')
  );
}

```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise vinyl-source-stream browserify tsify typescript`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for TS sources in `src/ts`.
- A default `buildTs` Task.
- A `tsconfig.json` file for configuring TS compiling options.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [browserify](https://www.npmjs.com/package/browserify)
- [tsify](https://www.npmjs.com/package/tsify)
- [typescript](https://www.npmjs.com/package/typescript)
