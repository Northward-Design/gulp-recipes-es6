Babel JS Ingredient
================================================================================

A Babel JS Task.

- Converts all ES6+ `.js` files to ES5, from `src/js` to `dist/styles`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';	

import { default as babel } from 'gulp-babel';

export default function buildJs() {
  return pump(
    src('src/js/**/*.js'),
    babel(),
    dest('dist/scripts')
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-babel`

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
- [gulp-babel](https://www.npmjs.com/package/gulp-babel)
