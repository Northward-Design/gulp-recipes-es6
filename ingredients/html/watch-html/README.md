Watch HTML Ingredient
================================================================================

An HTML Watch, Lint and Minification Task.

- Watches all `.html` files in `src/html`.
- Lints and Minifies all `.html` files from `src/html` to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
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

export function watchFiles() {
	watch('src/html/**/*.html', html);
}

export const all = series(html, watchFiles);

export default all;
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-htmlmin gulp-htmllint`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A `lintHtml` Task.
- A `buildHtml` Task.
- An `html` Task that uses `lintHtml` and `buildHtml`.
- A `watchFiles` Task.
- A default `all` Task that uses `html` and `watchFiles`.
- An `.htmllintrc` file for configuring `htmllint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)
- [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint)
