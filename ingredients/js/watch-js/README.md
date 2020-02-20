Watch JS Ingredient
================================================================================

A JS Watch, Lint, Browserify, Babelify and Minification Task with Source Maps.

- Watches all `.js` files in `src/js`.
- Lints, Bundles, Transpiles and Minifies all `.js` files from `src/js` to `dist/scripts`.
- Renames file to `*.min.js`.
- Creates an in-line Source Map in the `.min.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';
import { default as sourcemaps } from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';

import { default as eslint } from 'gulp-eslint';
import { default as browserify } from 'browserify';
import babel from 'babelify';
import uglify from 'gulp-uglify';

export const js = series(lintJs, buildJs);

export function lintJs() {
  return pump(
    src('js/**/*.js'),
    eslint(),
    eslint.formatEach(),
    eslint.failAfterError()
  );
}

export function buildJs() {
  return pump(
    browserify({
    	entries: ['src/js/index.js']
    })
    .transform(babel)
    .bundle(),
    source('index.js'),
    buffer(),
    uglify(),
    rename({suffix: '.min'}),
    sourcemaps.init({loadMaps: true}),
    dest('dist/scripts', {sourcemaps: true})
  );
}

export function watch() {
  watchfiles(config.src.js, js);
}

export const all = series(js, watch);

export default all;
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-eslint eslint-plugin-import browserify babelify vinyl-source-stream vinyl-buffer gulp-uglify gulp-rename gulp-sourcemaps`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for JS sources in `src/js`.
- A `lintJs` Task.
- A `buildJs` Task.
- A `js` Task that uses `lintJs` and `buildJs`.
- A `watch` Task.
- A default `all` Task that uses `js` and `watch`.
- An `.eslintrc.yaml` file for configuring `eslint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [browserify](https://www.npmjs.com/package/browserify)
- [babelify](https://www.npmjs.com/package/babelify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
