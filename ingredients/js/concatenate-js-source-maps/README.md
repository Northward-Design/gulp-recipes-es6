Concatenate JS Ingredient with Source Maps
================================================================================

A JS Concatenation Task.

- Concatenates all `.js` files from `src/js` to `dist/styles`.
- Creates an in-line Source Map in the `.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';	

import concat from 'gulp-concat';

export default function buildJs() {
  return pump(
    src('src/js/**/*.js', {sourcemaps: true}),
    concat('index.js'),
    dest('dist/scripts', {sourcemaps: true})
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-concat`

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
- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
