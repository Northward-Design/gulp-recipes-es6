BrowserSync SASS Ingredient
================================================================================

A SASS BrowserSync, Watch, Lint, Compile, Autoprefix and Minification Task with Source Maps.

- Synchronizes the browser to `dist/styles` and updates on any change.
- Watches all `.scss` files in `src/sass`.
- Lints, Compiles, Prefixes, and Minifies all `.scss` files from `src/sass` to `dist/styles`.
- Renames file to `*.min.css`.
- Creates an in-line Source Map in the `.min.css` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import sass from 'gulp-sass';
import stylelint from 'gulp-stylelint';
import browsersync from 'browser-sync';

import { default as autoprefixer } from 'gulp-autoprefixer';
import rename from 'gulp-rename';

const sync = browsersync.create();
const refresh = browsersync.reload();

export const sassy = series(lintSass, buildSass);

export function lintSass() {
  return pump(
    src('src/sass/**/*.scss'),
    stylelint({
      reporters: [{
        formatter: 'verbose',
        console: true
      }]
    })
  );
}

export function buildSass() {
  return pump(
    src('src/sass/**/*.scss', {sourcemaps: true}),
    sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }),
    autoprefixer(),
    rename({suffix: '.min'}),
    dest('dist/styles', {sourcemaps: true})
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
  watchfiles('src/sass/**/*.scss', sassy);
  watchfiles('dist/styles', refresh);
}

export const all = series(sassy, serve, watch);

export default all;
```

Notes:
- Errors and warnings reported by Stylelint will not halt remaining processes in a task or series.

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browser-sync gulp-stylelint stylelint-scss stylelint stylelint-config-standard stylelint-order gulp-autoprefixer gulp-rename gulp-sass`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for SASS sources in `src/sass`.
- A `lintSass` Task.
- A `buildSass` Task.
- An `sassy` Task that uses `lintSass` and `buildSass`.
- A `serve` Task.
- A `watch` Task.
- A default `all` Task that uses `sassy`, `serve`, and `watch`.
- A `.stylelintrc.yaml` file for configuring `stylelint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
