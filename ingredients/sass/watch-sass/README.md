Watch SASS Ingredient
================================================================================

A SASS Watch, Lint, Compile, Autoprefix and Minification Task with Source Maps.

- Watches all `.scss` files in `src/sass`.
- Lints, Compiles, Prefixes, and Minifies all `.scss` files from `src/sass` to `dist/styles`.
- Renames files to `*.min.css`.
- Creates an in-line Source Map in the `.min.css` file.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest, series, watch } = gulp;
import { default as pump } from 'pump-promise';

import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);
import stylelint from '@ronilaukkarinen/gulp-stylelint';

import { default as autoprefixer } from 'gulp-autoprefixer';
import rename from 'gulp-rename';

export const sassy = series(lintSass, buildSass);

export function lintSass() {
  return pump(
    src('src/sass/**/*.scss'),
    stylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }],
      customSyntax = 'postcss-scss';
    })
  );
}

export function buildSass() {
  return pump(
    src('src/sass/**/*.scss', {sourcemaps: true}),
    sass({errorLogToConsole: true, outputStyle: 'compressed'}),
    autoprefixer(),
    rename({suffix: '.min'}),
    dest('dist/styles', {sourcemaps: true})
  );
}

export function watchFiles() {
  watch('src/sass/**/*.scss', sassy);
}

export const all = series(sassy, watchFiles);

export default all;
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`gulp-stylelint` doesn't work with new version of stylelint at the moment, use `@ronilaukkarinen/gulp-stylelint` instead

`npm install --save-dev gulp pump-promise @ronilaukkarinen/gulp-stylelint stylelint stylelint-config-standard stylelint-order stylelint-scss gulp-autoprefixer gulp-rename gulp-sass sass postcss-scss`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for SASS sources in `src/sass`.
- A `lintSass` Task.
- A `buildSass` Task.
- A `sassy` Task that uses `lintSass` and `buildSass`.
- A `watchFiles` Task.
- A default `all` Task that uses `sassy`, and `watchFiles`.
- A `.stylelintrc.yaml` file for configuring `stylelint`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [sass](https://sass-lang.com/dart-sass)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [postcss-scss](https://www.npmjs.com/package/postcss-scss)
