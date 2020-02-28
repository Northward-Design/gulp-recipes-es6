Lint SASS Ingredient
================================================================================

A SASS Lint Task.

- Lints all `.scss` files in `src/sass`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src } from 'gulp';
import { default as pump } from 'pump-promise';

import stylelint from 'gulp-stylelint';

export default function lintSass() {
  return pump(
    src('src/sass/**/*.scss'),
    stylelint({
      reporters: [{
        formatter: 'verbose',
        console: true
      }]
		})
   );
}
```

Notes:
- Errors and warnings reported by Stylelint will not halt remaining processes in a task or series.

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-stylelint stylelint stylelint-config-standard stylelint-order stylelint-scss`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for SASS sources in `src/sass`.
- A default `lintSass` Task.
- A `.stylelintrc.yaml` file for configuring `stylelint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
