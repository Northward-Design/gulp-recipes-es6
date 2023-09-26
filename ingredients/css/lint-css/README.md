Lint CSS Ingredient
================================================================================

A CSS Lint Task.

- Lints all `.css` files in `src/css`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src } = gulp;
import { default as pump } from 'pump-promise';

import stylelint from '@ronilaukkarinen/gulp-stylelint';

export default function lintCss() {
  return pump(
    src('src/css/**/*.css'),
    stylelint({
      reporters: [{
        formatter: 'verbose',
        console: true
      }]
		})
   );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`gulp-stylelint` doesn't work with new version of stylelint at the moment, use `@ronilaukkarinen/gulp-stylelint` instead

`npm install --save-dev gulp pump-promise @ronilaukkarinen/gulp-stylelint stylelint stylelint-config-standard stylelint-order `

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A default `lintCss` Task.
- A `.stylelintrc.yaml` file for configuring stylelint.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [@ronilaukkarinen/gulp-stylelint](https://github.com/ronilaukkarinen/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
