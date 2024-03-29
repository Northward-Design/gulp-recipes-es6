Minify TS Ingredient with Source Maps
================================================================================

A TypesScript Compilation and Minification Task with Source Maps.

- Compiles and Minifies all `.ts` files from `src/ts` to `dist/scripts`.
- Renames files to `*.min.js` 
- Creates in-line Source Maps in each `.min.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import { default as typescript } from 'gulp-typescript';
import uglify from 'gulp-uglify';

export default function buildTs() {
  return pump(
    src('src/ts/**/*.ts', {sourcemaps: true}),
    typescript(),
    uglify(),
    rename({suffix: '.min'}),
    dest('dist/scripts', {sourcemaps: true})
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-typescript typescript gulp-uglify gulp-rename`

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
- [gulp-typescript](https://www.npmjs.com/package/gulp-typescript)
- [typescript](https://www.npmjs.com/package/typescript)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
