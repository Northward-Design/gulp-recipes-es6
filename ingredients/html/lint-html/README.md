Lint HTML
================================================================================

Lints all `.html` files in `src/html`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src } from 'gulp';
import { default as  pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';

export default function lintHtml() {
  return pump(
    src('src/html/**/*.html'),
    htmllint()
  );
}
````

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-htmllint`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A default `lintHtml` Task.
- An `.htmllintrc` file for configuring `htmllint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint)
