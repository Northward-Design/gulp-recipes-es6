Watch HTML Ingredient
================================================================================

An HTML Lint and Minify task.

Watches all `.html` files in `src/html`. 
Lints and Copies all `.html` files from  to `dist` in a minified format.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch } from 'gulp';
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
		htmlmin({collapseWhitespace: true}),
		dest('dist')
	);
}

export const html = series(lintHtml, buildHtml);

export function watchHtml() {
	watch('src/html/**/*.html', html);
}

export const buildAndWatchHtml = series(html, watchHtml);

export default buildAndWatchHtml;
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
- A `watchHtml` Task.
- A default `buildAndWatchHtml` Task.
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
