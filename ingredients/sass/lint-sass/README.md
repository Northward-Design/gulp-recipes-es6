Lint SASS Ingredient
================================================================================

A SASS Lint Task.

- Lints all `.scss` files in `src/sass`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src } = gulp;
import { default as pump } from 'pump-promise';

import stylelint from '@ronilaukkarinen/gulp-stylelint';

export default function lintSass() {
  return pump(
    src('src/sass/**/*.scss'),
    stylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }],
      customSyntax = 'postcss-scss';
		})
   );
}
```

Notes:
- Errors and warnings reported by Stylelint will not halt remaining processes in a task or series.

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`gulp-stylelint` doesn't work with new version of stylelint at the moment, use `@ronilaukkarinen/gulp-stylelint` instead

`npm install --save-dev gulp pump-promise @ronilaukkarinen/gulp-stylelint stylelint stylelint-config-standard stylelint-order stylelint-scss postcss-scss`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for SASS sources in `src/sass`.
- A default `lintSass` Task.
- A `.stylelintrc.yaml` file for configuring `stylelint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
- [postcss-scss](https://www.npmjs.com/package/postcss-scss)
