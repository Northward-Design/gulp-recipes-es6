Autoprefix CSS Ingredient with Source Maps
================================================================================

An CSS Autoprefixer Task with Source Maps.

- Prefixes all `.css` files from `src/css` to `dist/styles`.
- Creates an in-line Source Map in each `.css` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-autoprefixer`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A `buildCss` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
