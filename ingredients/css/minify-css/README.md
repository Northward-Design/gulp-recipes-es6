Minify CSS Ingredient
================================================================================

A CSS Minification Task.

- Minifies all `.css` files from `src/css` to `dist/styles`.
- Renames files to `*.min.css`.

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
      src('src/css/**/*.css'),
      cleancss({compatibility: 'ie8'}),
      rename({suffix: '.min'}),
      dest('dist/styles')
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
