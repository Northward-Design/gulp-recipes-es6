Browserify TS Ingredient with Source Maps
================================================================================

A Browserify TS Task with Source Maps.

- Bundles `index.ts` in `src/ts` with required files to `dist/styles`.
- Creates an in-line Source Map in the `.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { dest } = gulp;
import { default as pump } from 'pump-promise';
import { default as sourcemaps } from 'gulp-sourcemaps';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';

import { default as browserify } from 'browserify';
import { default as tsify } from 'tsify';

export default function buildTs() {
  return pump(
    browserify({
    	entries: 'src/ts/index.ts'
    })
    .plugin(tsify)
    .bundle(),
    source('index.js'),
    buffer(),
    sourcemaps.init({loadMaps: true}),
    dest('dist/scripts', {sourcemaps: true})
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-sourcemaps browserify tsify typescript vinyl-source-stream vinyl-buffer`

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
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [browserify](https://www.npmjs.com/package/browserify)
- [tsify](https://www.npmjs.com/package/tsify)
- [typescript](https://www.npmjs.com/package/typescript)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer)
