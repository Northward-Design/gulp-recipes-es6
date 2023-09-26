Purge CSS Ingredient
================================================================================

A Purge CSS Task

- Removes unused selectors from all `.css` files from `src/css` to `dist/styles`.
- It does this by comparing them to to all `.html` files in `src/html`.
- White list option keeps selectors not currently in `src/html` from being removed.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import purge from 'gulp-purgecss';

export default function thePurge() {
  return pump(
    src('src/css/**/*.css'),
    purge({
      content: ['src/html/**/*.html'],
      whitelist: ['class', 'id', 'other selectors']
    }),
    dest('dist/styles')
  );
}
```
Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-purgecss vinyl-sourcemaps-apply`

Note: May not need `vinyl-sourcemaps-apply` once bug in `gulp-purgecss/purgecss` is fixed.

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- Additional Configuration for HTML sources in `src/html`.
- A default `thePurge` :knife: Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-purgecss](https://www.npmjs.com/package/gulp-purgecss)
- [vinyl-sourcemaps-apply](https://www.npmjs.com/package/vinyl-sourcemaps-apply)
