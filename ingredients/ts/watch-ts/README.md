Watch TS Ingredient
================================================================================

A Typescript Watch, Lint, Bundle, Compile and Minify Task with Sourcemaps.

- Watches all `.ts` files in `src/ts`.
- Lints, Bundles, Compiles and Minifies files from `src/ts` to `dist/scripts`.
- Renames file to `.min.js`.
- Creates an in-line Source Map in the `.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';
import { default as sourcemaps } from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';

import { default as tslint } from 'gulp-tslint';
import { default as browserify } from 'browserify';
import { default as tsify } from 'tsify';
import uglify from 'gulp-uglify';

export const ts = series(lintTs, buildTs);

export function lintTs() {
  return pump(
    src('src/ts/**/*.ts'),
    tslint({ formatter = 'verbose' }),
    tslint.report()
  );
}

export function buildTs() {
  return pump(
    browserify({
      entries: ['src/ts/index.ts']
    })
    .plugin(tsify)
    .bundle(),
    source('index.js'),
    buffer(),
    uglify(),
    rename({suffix: '.min'}),
    sourcemaps.init({loadMaps: true}),
    dest('dist/scripts', {sourcemaps: true})
  );
}

export function watch(){
    watchfiles('ts/**/*.ts', ts);
}

export const all = series(ts, watch);

export default all
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-tslint tslint typescript gulp-uglify vinyl-source-stream vinyl-buffer browserify tsify gulp-rename gulp-sourcemaps`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for TS sources in `src/ts`.
- A `lintTs` Task.
- A `buildTs` Task.
- A `ts` Task that uses `lintTs` and `buildTs`.
- A `watch` Task
- A default `all` Task that uses `ts` and `watch`.
- A `tslint.yaml` file for configuring `tslint`.
- A `tsconfig.json` file to indicate the root directory for TypeScript. 

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-tslint](https://www.npmjs.com/package/gulp-tslint)
- [tslint](https://www.npmjs.com/package/tslint)
- [typescript](https://www.npmjs.com/package/typescript)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer)
- [browserify](https://www.npmjs.com/package/browserify)
- [tsify](https://www.npmjs.com/package/tsify)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
