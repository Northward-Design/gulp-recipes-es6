BrowserSync CSS Ingredient
================================================================================

A CSS BrowserSync, Watch, Lint, Autoprefixer, and Minification Task with Source Maps.

- Synchronizes the browser to `dist/styles` and updates on any change.
- Watches all `css` files in `src/css`.
- Lints, Prefixes, and Minifies all `.css` files from `src/css` to `dist/styles`.
- Renames files to `*.min.css`.
- Creates an in-line Source Map in each `.min.css` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles} from 'gulp';
import { default as pump } from 'pump-promise';

import stylelint from 'gulp-stylelint';
import { default as cleancss } from 'gulp-clean-css';
import browsersync from 'browser-sync';

import { default as autoprefixer } from 'gulp-autoprefixer';
import rename from 'gulp-rename';

const sync = browsersync.create();
const refresh = browsersync.reload();

export const css = series(lintCss, buildCss);

export function lintCss() {
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

export function buildCss() {
  return pump(
    src('src/css/**/*.css', {sourcemaps: true}),
    autoprefixer(),
    cleancss({compatibility: 'ie8'}),
    rename({suffix: '.min'}),
    dest('dist/styles', {sourcemaps: true}),
    sync.stream()
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
  watchfiles('src/css/**/*.css', css);
  watchfiles('dist/styles', refresh);
}

export const all = series(css, serve, watch);

export default all;
```

Notes:
- Errors or warnings reported by Stylelint will not halt remaining tasks in a series.

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browser-sync gulp-stylelint stylelint stylelint-config-standard stylelint-order gulp-autoprefixer gulp-clean-css gulp-rename`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A `lintCss` Task.
- A `buildCss` Task.
- A `serve` Task.
- A `css` Task that uses `lintCss` and `buildCss`.
- A `watch` Task.
- A default `all` Task that uses `css`, `serve`, and `watch`. 
- An `.stylelintrc.yaml` file for configuring `stylelint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
