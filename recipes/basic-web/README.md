Basic Web Recipe (HTML, CSS, JS, and Basic Images)
================================================================================

A Recipe to Lint, Build, Optimize, Watch, Sync and Clean: HTML, CSS, JS, and Images.

- Synchronizes the browser to `dist` and updates on any change to all files.
- Watches all `.html`, `.css`, `.js`, and image files in `src`.

- Lints and Minifies all `.html` files from `src/html` to `dist`.

- Lints, Prefixes, and Minifies all `.css` files from `src/css` to `dist/styles`.
- Renames files to `*.min.css`.

- Lints, Bundles, Transpiles and Minifies all `.js` files from `src/js` to `dist/scripts`.
- Renames file to `*.min.js`.
- Creates an in-line Source Map in the `.min.js` and the `.min.css` files.

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
import { default as cleancss } from 'gulp-clean-css';
import { default as eslint } from 'gulp-eslint';
import { default as browserify } from 'browserify';
import babel from 'babelify';
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

export const css = series(cleanCss, lintCss, buildCss);

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

export const js = series(cleanJs, lintJs, buildJs);

export function lintJs() {
  return pump(
    src('js/**/*.js'),
    eslint(),
    eslint.formatEach(),
    eslint.failAfterError()
  );
}

export function buildJs() {
  return pump(
    browserify({
      entries: ['src/js/index.js']
    })
    .transform(babel)
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
    src(['src/images/**/*.{png,gif,jpg,jpeg,svg}', '!src/images/pre-op/**/*']),
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
    src('src/images/pre-op/**/*.{png,gif,jpg,jpeg,svg}'),
    changed('dist/images'),
    dest('dist/images'),
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
	watchfiles('src/html/**/*.html', html);
  watchfiles('src/css/**/*.css', css);
  watchfiles('src/js/**/*.js', js);
  watchfiles('src/images/**/*.{png,gif,jpg,jpeg,svg}', optimizeImg);
	watchfiles('dist', refresh);
}

export function clean() {
  return del('dist');
}

export function cleanHtml() {
  return del('dist/*.html');
}

export function cleanCss() {
  return del('dist/styles');
}

export function cleanJs() {
  return del('dist/scripts');
}

export const lint = series(lintHtml, lintCss, lintJs);

export const build = series(clean, buildHtml, buildCss, buildJs, optimizeImg);

export const all = series(lint, build, serve, watch);

export default all;
```

Notes:
- Errors and warnings reported by Stylelint will not halt remaining processes in a task or series.
- Previously Optimized Images may increase in size. Use an images sub-folder `src/images/pre-op`

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browser-sync gulp-htmlmin gulp-htmllint gulp-stylelint stylelint stylelint-config-standard stylelint-order gulp-autoprefixer gulp-clean-css gulp-rename gulp-eslint eslint-plugin-import browserify babelify vinyl-source-stream vinyl-buffer gulp-uglify gulp-sourcemaps gulp-imagemin gulp-changed del`
- Used `gulp-imagemin@7.0.0`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for CSS sources in `src/css`.
- Additional Configuration for JS sources in `src/js`.
- Additional Configuration for Image sources in `src/images` and `src/images/optimized`.

### Tasks

- A `serve` Task.
- A `watch` Task.
- A `clean` Task.

- A `lintHtml` Task.
- A `lintCss` Task.
- A `lintJs` Task.
- A `buildHtml` Task.
- A `buildCss` Task.
- A `buildJs` Task.
- An `optimizeImg` Task.
- A `cleanHtml` Task.
- A `cleanCss` Task.
- A `cleanJs` Task.

- An `html` Task that uses `cleanHtml`, `lintHtml` and `buildHtml`.
- A `css` Task that uses `cleanCss`, `lintCss` and `buildCss`.
- A `js` Task that uses `cleanJS`, `lintJs` and `buildJs`.
- A `lint` Task that uses `lintHtml`, `lintCss` and `lintJs`.
- A `build` Task that uses `clean`, `buildHtml`, `buildCss`, `buildJs` and `optimizeImg`.

- A default `all` Task that uses `lint`, `build`, `serve` and `watch`.

### Files

- An `.htmllintrc` file for configuring `htmllint`.
- An `.stylelintrc.yaml` file for configuring `stylelint`.
- An `.eslintrc.yaml` file for configuring `eslint`.

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
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [browserify](https://www.npmjs.com/package/browserify)
- [babelify](https://www.npmjs.com/package/babelify)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [gulp-changed](https://www.npmjs.com/package/gulp-changed)
- [del](https://www.npmjs.com/package/del)
