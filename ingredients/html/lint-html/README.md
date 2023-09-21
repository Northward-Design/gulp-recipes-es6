Lint HTML Ingredient
================================================================================

An HTML Lint Task.

- Lints all `.html` files in `src/html`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src } = gulp;
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

`npm install --save-dev gulp pump-promise gulp-htmllint`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A default `lintHtml` Task.
- An `.htmllintrc` file for configuring `htmllint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint)
