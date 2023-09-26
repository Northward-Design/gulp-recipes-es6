Babel JS Ingredient with Source Maps
================================================================================

A Babel JS Task with Source Maps.

- Converts all ES6+ `.js` files to ES5, from `src/js` to `dist/styles`.
- Creates an in-line Source Map in each `.js` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';	

import { default as babel } from 'gulp-babel';

export default function buildJs() {
  return pump(
    src('src/js/**/*.js', { sourcemaps: true }),
    babel(),
    dest('dist/scripts', { sourcemaps: true })
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-babel @babel/core @babel/preset-env`

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
- [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
