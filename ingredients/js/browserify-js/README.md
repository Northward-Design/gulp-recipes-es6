Browserify JS Ingredient
================================================================================

A Browserify JS Task.

- Bundles `index.js` from `src/js` with required files to `dist/styles`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { dest } = gulp;
import { default as pump } from 'pump-promise';
import { default as source } from 'vinyl-source-stream';

import { default as browserify } from 'browserify';

export default function buildJs() {
  return pump(
    browserify({
    	entries: ['src/js/index.js']
    }).bundle(),
    source('index.js'),
    dest('dist/scripts')
  )
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise browserify vinyl-source-stream`

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
- [browserify](https://www.npmjs.com/package/browserify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
