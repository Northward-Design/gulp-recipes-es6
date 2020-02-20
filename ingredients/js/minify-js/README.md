Minify JavaScript Ingredient
================================================================================

A JavaScript Minification Task.

- Minifies all `.js` files from `src/js` to `dist/scripts`.
- Renames files to `*.min.js`

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import uglify from 'gulp-uglify';

export default function buildJs() {
  return pump(
    src('src/js/**/*.js'),
    uglify(),
    rename({suffix: '.min'}),
    dest('dist/scripts')
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-uglify gulp-rename`

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
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
