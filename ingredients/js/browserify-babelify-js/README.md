Browserify and Babilify JS Ingredient
================================================================================

A JS Browserify and Babelify Task. 

- Bundles `index.js` from `src/js` with required files to `dist/styles/index.js`.
- Converts bundled `.js` file from ES6+ to ES5.

Usage
--------------------------------------------------------------------------------

```javascript
import { dest } from 'gulp';
import { default as pump } from 'pump-promise';
import { default as source } from 'vinyl-source-stream';

import { default as browserify } from 'browserify';
import babel from 'babelify';

export default function buildJs() {
  return pump(
    browserify({
    	entries: ['src/js/index.js']
    })
    .transform(babel)
    .bundle(),
    source('index.js'),
    dest('dist/scripts')
  )
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browserify babelify vinyl-source-stream`

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
- [browserify](https://www.npmjs.com/package/browserify)
- [babelify](https://www.npmjs.com/package/babelify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
