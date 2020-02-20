Minify TS Ingredient
================================================================================

A TypesScript Compilation and Minification Task.

- Compiles and Minifies all `.ts` files from `src/ts` to `dist/scripts`.
- Renames files to `*.min.js` 

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import { default as typescript } from 'gulp-typescript';
import uglify from 'gulp-uglify';

export default function buildTs() {
  return pump(
    src('src/ts/**/*.ts'),
    typescript(),
    uglify(),
    rename({suffix: '.min'}),
    dest('dist/scripts')
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-typescript typescript gulp-uglify gulp-rename`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for TS sources in `src/ts`.
- A default `buildTs` Task.
- A `tsconfig.json` file for configuring TS compiling options.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-typescript](https://www.npmjs.com/package/gulp-typescript)
- [typescript](https://www.npmjs.com/package/typescript)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
