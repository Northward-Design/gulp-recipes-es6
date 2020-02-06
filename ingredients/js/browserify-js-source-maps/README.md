Browserify JS Ingredient with Source Maps
================================================================================

A Browserify JS Task with Source Maps.

- Bundles `index.js` in `src/js` with required files to `dist/styles` using [browserify](https://www.npmjs.com/package/browserify).
- Creates an in-line Source Map in the `.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browserify vinyl-source-stream vinyl-buffer gulp-sourcemaps`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for JS sources in `src/js`.
- A default `buildJs` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [browserify](https://www.npmjs.com/package/browserify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
