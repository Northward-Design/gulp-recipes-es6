Lint JS Ingredient
================================================================================

A JavaScript Linting Task.

Lints all `.js` files in `src/js`. 

Usage
--------------------------------------------------------------------------------

```javascript
import { src } from 'gulp';
import { default as pump } from 'pump-promise';	

import { default as eslint } from 'gulp-eslint';

export default function lintJs() {
  return pump(
    src(config.src.js),
    eslint(),
    eslint.formatEach(),
    eslint.failAfterError()
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-eslint eslint-plugin-import`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for JS sources in `src/js`.
- A `lintJs` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
