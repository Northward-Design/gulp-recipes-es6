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
const { src, dest, series, watch } = gulp;
import { default as pump } from 'pump-promise';

import stylelint from '@ronilaukkarinen/gulp-stylelint';
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

export function watchFiles() {
  watch('src/css/**/*.css', css);
  watch('dist/styles', refresh);
}

export const all = series(css, serve, watchFiles);

export default all;
```

Notes:
- Errors and warnings reported by Stylelint will not halt remaining processes in a task or series.

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`gulp-stylelint` doesn't work with new version of stylelint at the moment, use `@ronilaukkarinen/gulp-stylelint` instead

`npm install --save-dev gulp pump-promise browser-sync @ronilaukkarinen/gulp-stylelint stylelint stylelint-config-standard stylelint-order gulp-autoprefixer gulp-clean-css gulp-rename`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A `lintCss` Task.
- A `buildCss` Task.
- A `serve` Task.
- A `css` Task that uses `lintCss` and `buildCss`.
- A `watchFiles` Task.
- A default `all` Task that uses `css`, `serve`, and `watchFiles`. 
- An `.stylelintrc.yaml` file for configuring `stylelint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [@ronilaukkarinen/gulp-stylelint](https://github.com/ronilaukkarinen/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
