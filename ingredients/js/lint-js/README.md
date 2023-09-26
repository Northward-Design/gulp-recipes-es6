Lint JS Ingredient
================================================================================

A JavaScript Lint Task.

- Lints all `.js` files in `src/js`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src } = gulp;
import { default as pump } from 'pump-promise';	

import { default as eslint } from 'gulp-eslint';

export default function lintJs() {
  return pump(
    src('src/js/**/*.js'),
    eslint(),
    eslint.formatEach(),
    eslint.failAfterError()
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-eslint eslint-plugin-import`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for JS sources in `src/js`.
- A default `lintJs` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
