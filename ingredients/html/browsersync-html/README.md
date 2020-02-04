BrowserSync HTML Ingredient
================================================================================

An HTML BrowserSync, Lint, Minify and Watch task.

Synchronizes the Browser to `dist` and updates on any change to `.html` using [browser-sync](https://www.npmjs.com/package/browser-sync).
Watches all `.html` files in `src/html`. 
Lints and Copies all `.html` files from `src/html` to `dist` in a minified format.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';

import browsersync from 'browser-sync';

const sync = browsersync.create();
const refresh = browsersync.reload();

export const html = series(lintHtml, buildHtml);

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

export function serve(done) {
  sync.init({
  	server: {
  		baseDir: 'dist'
  	}
  });
  done();
}

export function watch() {
	watchfiles('src/html/**/*.html', html);
	watchfiles('dist/*.html', refresh);
}

export const all = series(html, serve, watch);

export default all;
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browser-sync gulp-htmlmin gulp-htmllint`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A `lintHtml` Task.
- A `buildHtml` Task.
- A `serve` Task.
- An `html` Task that calls `lintHtml` and `buildHtml` in a series
- A `watch` Task.
- A default `all` Task that calls `html`, `serve`, and `refresh` in a series 
- An `.htmllintrc` file for configuring `htmllint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)
- [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint)