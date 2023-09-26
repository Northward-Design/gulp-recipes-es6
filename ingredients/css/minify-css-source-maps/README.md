Minify CSS Ingredient with Source Maps
================================================================================

A CSS Minification Task with Source Maps.

- Minifies all `.css` files from `src/css` to `dist/styles`.
- Renames files to `*.min.css`.
- Creates an in-line Source Map in each `.min.css` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import { default as cleancss } from 'gulp-clean-css';

export default function buildCss() {
  return pump(
      src('src/css/**/*.css', {sourcemaps: true}),
      cleancss({compatibility: 'ie8'}),
      rename({suffix: '.min'}),
      dest('dist/styles', {sourcemaps: true})
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-clean-css gulp-rename`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A default `buildCss` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
