Minify JavaScript Ingredient with Source Maps
================================================================================

A JavaScript Minification Task with Source Maps

- Minifies all `.js` files from `src/js` to `dist/scripts`.
- Renames files to `*.min.js`
- Creates an in-line Source Map in each `.min.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import uglify from 'gulp-uglify';

export default function buildJs() {
  return pump(
    src('src/js/**/*.js', { sourcemaps: true }),
    uglify(),
    rename({suffix: '.min'}),
    dest('dist/scripts', { sourcemaps: true })
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-uglify gulp-rename`

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
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
