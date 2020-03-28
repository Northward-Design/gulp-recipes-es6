Modern Web Recipe (HTML, SASS, TS, and Basic Images)
================================================================================

A Recipe to Lint, Compile, Optimize, Watch, Sync and Clean: HTML, SASS, TS, and Images.

- Synchronizes the browser to `dist` and updates on any change to all files.
- Watches all `.html`, `.scss`, `.ts`, and image files in `src`.

- Lints and Minifies all `.html` files from `src/html` to `dist`.

- Lints, Compiles, Prefixes, and Minifies all `.scss` files from `src/sass` to `dist/styles`.
- Renames file to `*.min.css`.

- Lints, Bundles, Compiles and Minifies all `.ts` files from `src/ts` to `dist/scripts`.
- Renames file to `*.min.js`.
- Creates an in-line Source Map in the `.min.js` and `.min.css` files.

- Optimizes all `.jpg`, `.jpeg`, `.png`, `.gif`, and `.svg` images from `src/images` to `dist/images`.
- Only newly added or changed images will be optimized when 'watched'.

- Removes `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';
import stylelint from 'gulp-stylelint';
import sass from 'gulp-sass';
import { default as tslint } from 'gulp-tslint';
import { default as browserify } from 'browserify';
import tsify from 'tsify';
import uglify from 'gulp-uglify';
import { default as imgmin } from 'gulp-imagemin';

import { default as autoprefixer } from 'gulp-autoprefixer';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';
import { default as sourcemaps } from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import { default as changed } from 'gulp-changed';
import browsersync from 'browser-sync';
import { default as del } from 'del';

const sync = browsersync.create();
const refresh = browsersync.reload();

export function serve(done) {
  sync.init({
  	server: {
  		baseDir: 'dist'
  	}
  });
  done();
}

export const html = series(cleanHtml, lintHtml, buildHtml);

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
		dest('dist'),
    sync.stream()
	);
}

export const sassy = series(cleanSass, lintSass, buildSass);

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

export const ts = series(cleanTs, lintTs, buildTs);

export function lintTs() {
  return pump(
    src('src/ts/**/*.ts'),
    tslint({ formatter = 'verbose' }),
    tslint.report()
  );
}

export function buildTs() {
  return pump(
    browserify({
      entries: ['src/ts/index.ts']
    })
    .plugin(tsify)
    .bundle(),
    source('index.js'),
    buffer(),
    uglify(),
    rename({suffix: '.min'}),
    sourcemaps.init({loadMaps: true}),
    dest('dist/scripts', {sourcemaps: true}),
    sync.stream()
  );
}

export function optimizeImg() {
  return pump(
    src(['src/images/**/*.{png,gif,jpg,jpeg,svg}', '!src/images/optimized/**/*']),
    changed('dist/images'),
    imgmin([
      imgmin.gifsicle({
        optimizationLevel: 3, 
        progressive: true
      }),
      imgmin.mozjpeg({
        quality: 75, 
        progressive: true
      }),
      imgmin.optipng({
        optimizationLevel: 5
      }),
      imgmin.svgo({
        plugins:[{
            removeViewBox: true
        }]
      })
    ],
    {verbose: true}
    ),
    src('src/images/optimized/**/*.{png,gif,jpg,jpeg,svg}'),
    changed('dist/images'),
    dest('dist/images'),
    sync.stream()
  );
}

export function watch() {
	watchfiles('src/html/**/*.html', html);
  watchfiles('src/sass/**/*.scss', sassy);
  watchfiles('src/ts/**/*.ts', ts);
  watchfiles('src/images/**/*.{png,gif,jpg,jpeg,svg}', optimizeImg);
	watchfiles('dist', refresh);
}

export function clean() {
  return del('dist');
}

export function cleanHtml() {
  return del('dist/*.html');
}

export function cleanSass() {
  return del('dist/styles');
}

export function cleanTs() {
  return del('dist/scripts');
}

export const lint = series(lintHtml, lintSass, lintTs);

export const build = series(clean, buildHtml, buildSass, buildTs, optimizeImg);

export const all = series(lint, build, serve, watch);

export default all;
```

Notes:
- Errors and warnings reported by Stylelint will not halt remaining processes in a task or series.
- Pre-Optimized Images may increase in size. Use the images sub-folder `src/images/optimized`

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browser-sync gulp-htmlmin gulp-htmllint gulp-sass stylelint-scss gulp-stylelint stylelint stylelint-config-standard stylelint-order gulp-autoprefixer gulp-rename gulp-tslint tslint typescript browserify tsify vinyl-source-stream vinyl-buffer gulp-uglify gulp-sourcemaps gulp-imagemin gulp-changed del`
- Used `gulp-imagemin@7.0.0`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for SASS sources in `src/sass`.
- Additional Configuration for TS sources in `src/ts`.
- Additional Configuration for Image sources in `src/images` and `src/images/optimized`.

### Tasks

- A `serve` Task.
- A `watch` Task.
- A `clean` Task.

- A `lintHtml` Task.
- A `lintSass` Task.
- A `lintTs` Task.
- A `buildHtml` Task.
- A `buildSass` Task.
- A `buildTs` Task.
- An `optimizeImg` Task.
- A `cleanHtml` Task.
- A `cleanSass` Task.
- A `cleanTs` Task.

- An `html` Task that uses `cleanHtml`, `lintHtml` and `buildHtml`.
- A `sassy` Task that uses `cleanSass`, `lintSass` and `buildSass`.
- A `ts` Task that uses `cleanTS`, `lintTs` and `buildTs`.
- A `lint` Task that uses `lintHtml`, `lintSass` and `lintTs`.
- A `build` Task that uses `clean`, `buildHtml`, `buildSass`, `buildTs` and `optimizeImg`.

- A default `all` Task that uses `lint`, `build`, `serve` and `watch`.

### Files

- An `.htmllintrc` file for configuring `htmllint`.
- A `.stylelintrc.yaml` file for configuring `stylelint`.
- A `tslint.yaml` file for configuring `tslint`.
- A `tsconfig.json` file for configuring TS compiling options.

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
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-tslint](https://www.npmjs.com/package/gulp-tslint)
- [tslint](https://www.npmjs.com/package/tslint)
- [typescript](https://www.npmjs.com/package/typescript)
- [browserify](https://www.npmjs.com/package/browserify)
- [tsify](https://www.npmjs.com/package/tsify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [gulp-changed](https://www.npmjs.com/package/gulp-changed)
- [del](https://www.npmjs.com/package/del)
