Lint TS Ingredient
================================================================================

A TypeScript Lint Task.

- Lints all `.ts` files in `src/ts`

Usage
--------------------------------------------------------------------------------

```javascript
import { src } from 'gulp';
import { default as pump } from 'pump-promise';

import { default as tslint } from 'gulp-tslint';

export default function lintTs() {
  return pump(
    src('src/ts/**/*.ts'),
    tslint({ formatter: 'verbose' }),
    tslint.report()
   );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-tslint tslint typescript`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for TS sources in `src/ts`.
- A default `lintTs` Task.
- A `tslint.yaml` file for configuring `tslint`.
- A `tsconfig.json` file for configuring TS compiling options.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-tslint](https://www.npmjs.com/package/gulp-tslint)
- [tslint](https://www.npmjs.com/package/tslint)
- [typescript](https://www.npmjs.com/package/typescript)
