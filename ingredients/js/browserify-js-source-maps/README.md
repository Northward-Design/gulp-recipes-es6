Browserify JS Ingredient with Source Maps
================================================================================

A Browserify JS Task with Source Maps.

- Bundles `index.js` from `src/js` with required files to `dist/styles`.
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

export default function buildJs() {
  return pump(
    browserify({
    	entries: ['src/js/index.js']
    }).bundle(),
    source('index.js'),
    buffer(),
    sourcemaps.init({loadMaps: true}),
    dest('dst/scripts', {sourcemaps: true})
  )
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise browserify vinyl-source-stream vinyl-buffer gulp-sourcemaps`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for JS sources in `src/js`.
- A default `buildJs` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [browserify](https://www.npmjs.com/package/browserify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
