Autoprefix CSS Ingredient with Source Maps
================================================================================

An CSS Autoprefixer Task with Source Maps.

- Prefixes all `.css` files from `src/css` to `dist/styles`.
- Creates an in-line Source Map in each `.css` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import { default as autoprefixer } from 'gulp-autoprefixer';

export default function buildCss() {
  return pump(
    src('src/css/**/*.css', { sourcemaps: true }),
    autoprefixer(),
    dest('dist/styles', { sourcemaps: true })
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-autoprefixer`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A `buildCss` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
