Purge CSS Ingredient
================================================================================

A Purge CSS Task

- Removes unused selectors from all `.css` files from `src/css` to `dist/styles`.
- It does this by comparing them to to all `.html` files in `src/html`.
- White list option keeps selectors not currently in `src/html` from being removed.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-purgecss`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- Additional Configuration for HTML sources in `src/html`.
- A default `thePurge` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-purgecss](https://www.npmjs.com/package/gulp-purgecss)
