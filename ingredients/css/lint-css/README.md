Lint CSS
================================================================================

An CSS Lint task.

Lints all `.css` files in `src/css`, with [gulp-stylelint](https://www.npmjs.com/package/stylelint).

Usage
--------------------------------------------------------------------------------

```javascript
import { src } from 'gulp';
import { default as pump } from 'pump-promise';

import stylelint from 'gulp-stylelint';

export default function lintCss() {
  return pump(
    src('src/css/**/*.css'),
    stylelint({
    	reporters: [
    		{formatter: 'verbose', console: true}
			]
		})
   );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-stylelint stylelint stylelint-config-standard stylelint-order`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A default `lintCss` Task.
- A `.stylelintrc.yaml` file for configuring stylelint.

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
