Compile TS Ingredient
================================================================================

A Typescript Compilation Task.

- Compiles all `.ts` files from `src/ts` to `dist/scripts` with [gulp-typescript](https://www.npmjs.com/package/gulp-typescript).
-	Creates in-line Source Maps in the `.js` files.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-typescript typescript`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for TS sources in `src/ts`.
- A default `buildTs` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-typescript](https://www.npmjs.com/package/gulp-typescript)
- [typescript](https://www.npmjs.com/package/typescript)
