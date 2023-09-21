Concatenate JS Ingredient with Source Maps
================================================================================

A JS Concatenation Task.

- Concatenates all `.js` files from `src/js` to `dist/styles`.
- Creates an in-line Source Map in the `.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
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

`npm install --save-dev gulp pump-promise gulp-concat`

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
- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
