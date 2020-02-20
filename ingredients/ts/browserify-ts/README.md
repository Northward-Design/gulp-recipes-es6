Browserify TS Ingredient
================================================================================

A Browserify TS Task.

- Bundles `index.ts` in `src/js` with required files to `dist/styles`.

Usage
--------------------------------------------------------------------------------

```javascript
import { dest } from 'gulp';
import { default as pump } from 'pump-promise';
import { default as source } from 'vinyl-source-stream';

import { default as browserify } from 'browserify';
import { default as tsify } from 'tsify';

export default function buildTs() {
  return pump(
    browserify({
    	entries: ['src/ts/index.ts']
    })
    .plugin(tsify)
    .bundle(),
    source('index.ts'),
    dest('dist/scripts')
  );
}

```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise vinyl-source-stream browserify tsify typescript`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for TS sources in `src/ts`.
- A default `buildTs` Task.
- A `tsconfig.json` file for configuring TS compiling options.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [browserify](https://www.npmjs.com/package/browserify)
- [tsify](https://www.npmjs.com/package/tsify)
- [typescript](https://www.npmjs.com/package/typescript)
