Compile TS Ingredient with Source Maps
================================================================================

A Typescript Compilation Task with Source Maps.

- Compiles all `.ts` files from `src/ts` to `dist/scripts`.
-	Creates in-line Source Maps in each `.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import typescript from 'gulp-typescript';

export default function buildTs() {
  return pump(
    src('src/ts/**/*.ts', { sourcemaps: true }),
    typescript(),
    dest('dist/scripts', { sourcemaps: true })
   );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-typescript typescript`

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
