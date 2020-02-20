Minify HTML Ingredient
================================================================================

An HTML Minification Task.

- Minifies all `.html` files from `src/html` to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import htmlmin from 'gulp-htmlmin';

export default function buildHtml() {
  return pump(
    src('src/html/**/*.html'),
    htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }),
    dest('dist')
  );
}

```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-htmlmin`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A default `buildHtml` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [@babel/core](https://www.npmjs.com/package/@babel/core/)
- [@babel/register](https://www.npmjs.com/package/@babel/register/)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)
