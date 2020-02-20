Watch HTML Ingredient
================================================================================

An HTML Watch, Lint and Minification Task.

- Watches all `.html` files in `src/html`.
- Lints and Minifies all `.html` files from `src/html` to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';

export function lintHtml() {
	return pump(
		src('src/html/**/*.html'),
		htmllint({failOnError: true})
	);
}

export function buildHtml() {
	return pump(
		src('src/html/**/*.html'),
		htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}),
		dest('dist')
	);
}

export const html = series(lintHtml, buildHtml);

export function watch() {
	watchfiles('src/html/**/*.html', html);
}

export const all = series(html, watch);

export default all;
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-htmlmin gulp-htmllint`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A `lintHtml` Task.
- A `buildHtml` Task.
- An `html` Task that uses `lintHtml` and `buildHtml`.
- A `watch` Task.
- A default `all` Task that uses `html` and `watch`.
- An `.htmllintrc` file for configuring `htmllint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)
- [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint)
