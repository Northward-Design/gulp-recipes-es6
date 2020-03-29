Responsive Modern Web Recipe (HTML, SASS, TS, and Responsive Images)
================================================================================

In Development (NODE_ENV !== 'production'): A Recipe to Lint, Compile, Minify, Optimize, Watch, Sync and Clean: HTML, SASS, TS, and Images.

- Synchronizes the browser to `dist` and updates on any change to all files.
- Watches all `.html`, `.scss`, `.ts`, and image files in `src`.

- Lints all `.html` files from `src/html` to `dist`, and Injects a script tag linking `dist/scripts/index.js`.

- Lints, Compiles, Prefixes, adds Selected Images relative paths and sizes, and Minifies all `.scss` files from `src/sass` to `dist/styles`.
- Renames file to `*.min.css`.

- Lints, Bundles, Compiles and Minifies all `.ts` files from `src/ts` to `dist/scripts`.
- Renames file to `*.min.js`.
- Creates an in-line Source Map in the `.min.js` and `.min.css` files.

- Optimizes all `.jpg`, `.jpeg`, `.png`, `.gif`, and `.svg` images from `src/images` to `dist/images`.
- Only newly added or changed images will be optimized when 'watched'.

- Removes `dist`.

In Production (NODE_ENV == 'production'): A Recipe to Compile, Minify, Optimize, Purge, Inject, Gzip: HTML, SASS, TS, and Images.

- Removes `dist`.
- Optimizes all `.jpg`, `.jpeg`, `.png`, `.gif`, and `.svg` images from `src/images/optimize` to `dist/images`.

- Bundles, Compiles and Minifies all `.ts` files from `src/ts` to `dist/scripts`.

- Compiles, Prefixes, Purges, adds Selected Images relative paths and sizes, and Minifies all `.scss` files from `src/sass` to `dist/styles`.
- Renames file to `*.min.css`.
- Creates a duplicate Gzip file `*.min.css.gz` if it is smaller than the original.

- Injects Contents from `dist/scripts/index.js` into all `.html` files from `src/html` to `dist`.
- Copies critical-path (above the fold) CSS and In-lines it into the `.html` files in `dist`.
- Generates a script in all `.html` files to asynchronously load external `.css` file.
- Minifies all `.html` files and Creates duplicate Gzip files: `*.html.gz` for each that is smaller than its original.

- Creates a `sitemap.xml` file in the `dist` folder based on the `.html` files in `dist`.

- Removes `dist/scripts`, as it is not needed.

### Responsive Images (Development and Production)
- Copies `.jpg` and `.jpeg` file names from `src/images`.
- Interpolates file paths, names, alt, media queries, and image widths in a large string.
- Injects string(s) (based on the number of image files) into `.html` files from `src/html` to `dist`.
- Strings can be srcset or Lazy Load srcset, read below for Lazy Load requirements.
- Resizes all `.jpg` and `.jpeg` images from `src/images` to `dist/images`.
- Creates a set of multiple sizes with the same width settings mentioned before, and suffixes them.
- Converts `.jpg` and `.jpeg` to `.jpg` and `.webp` formats. Reduces only, does not enlarge.
- Option to convert very small `.jpg` images for Lazy Load to Base64 and in-lined into `.html`.
- Concatenates all `.js` files from `src/ts/plugins` into the bundled `.ts` file mentioned above.
- In Development: Only newly added or changed images will be optimized when 'watched'.
- WARNING: Do not edit images intended for responsive directly in `src/images` while being watched. Copy into folder instead.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, parallel, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import stylelint from 'gulp-stylelint';
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

import gulpif from 'gulp-if';
import crit from 'critical';
import purge from 'gulp-purgecss';
import inject from 'gulp-inject';
import postcss from 'gulp-postcss';
import assets from 'postcss-assets';
import gzip from 'gulp-gzip';
import sitemap from 'gulp-sitemap';
import concat from 'gulp-concat';
import { default as responsive } from 'gulp-responsive';
import base64 from 'gulp-base64-inline';
import cache from 'gulp-cached';

import strimg from './string-img-sets.js';

const sync = browsersync.create();
const refresh = browsersync.reload();

let imgcount;
let altcount;

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
    inject(
      src([
        'src/images/**/*.{jpg,jpeg}',
        '!src/images/optimize/**/*',
        '!src/images/pre-op/**/*'
      ]),
      {
        ignorePath: '../',
        relative = true,
        removeTags = true,
        starttag: () => {
          imgcount++;
          return `<!-- inject:img${imgcount} -->`;
        },
        transform: (filepath) => {
          altcount++;
          let pathName = filepath.substring(0, filepath.lastIndexOf('.'));
          let name = pathName.substring(pathName.lastIndexOf('/')+1);
          return //example string
            ` <picture>
                <source
                  srcset="
                    ${path}-${xs}w.webp ${xs}w,
                    ${path}-${sm}w.webp ${sm}w,
                    ${path}-${md}w.webp ${md}w,
                    ${path}-${lg}w.webp ${lg}w,
                    ${path}-${xl}w.webp ${xl}w,
                    ${path}-${xs}w@3x.webp ${xs * 3}w,
                    ...
                <img class="${name}"
                  srcset="
                    ...
                    ${path}-${md}w@2x.jpeg ${md * 2}w,
                    ${path}-${lg}w@2x.jpeg ${lg * 2}w,
                    ${path}-${xl}w@2x.jpeg ${xl * 2}w,
                    ${path}-${md}w@4x.jpeg ${md * 4}w"
                  sizes="${xsScrn}"
                  src="${path}-${lg}w.jpg"
                alt="${alt}">
              </picture>`;
        }
      }
    ),
    inject(src(['dist/scripts/index.min.js']),
    gulpif( process.env.NODE_ENV !== 'production', {
      removeTags: true,
      ignorePath: 'dist',
      addRootSlash: false,
    }, {
      removeTags: true,
      transform: (filePath, file) => {
        return '<script>'+file.contents.toString()+'</script>';
      };
    })),
    base64('dist', {
      prefix: "",
      suffix: ""
    }),
    gulpif( process.env.NODE_ENV == 'production',
      crit.stream({
        css: ['dist/styles/index.min.css'],
        inline: true,
        ignore: {atrule: ['@font-face']},
        dimensions: [{height: 1440, width: 2560}]
    })),
    gulpif( process.env.NODE_ENV == 'production',
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
        minifyJS: true,
        customAttrCollapse: /srcset|sizes|data-srcset|data-sizes/
    })),
    dest('dist'),
    gulpif( process.env.NODE_ENV == 'production', 
      gzip({
        deleteMode: 'dist',
        append: true,
        skipGrowingFiles: true,
        gzipOptions: {
          level: 9,
          memLevel: 9
        }
    })),
    gulpif( process.env.NODE_ENV == 'production', dest('dist')),
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
    src('src/sass/**/*.scss'),
    gulpif( process.env.NODE_ENV !== 'production', sourcemaps.init({loadMaps: true})),
    sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }),
    autoprefixer(),
    rename({suffix: '.min'}),
    gulpif( process.env.NODE_ENV == 'production', purge({
      content: ['src/html/**/*.html'],
      whitelist: ['some', 'js', 'created', 'class']
      })
    ),
    postcss([
      assets({
        loadPaths: ['dist/images'],
        relative: 'dist/styles'
      })
    ]),
    dest('dist/styles', gulpif( process.env.NODE_ENV !== 'production', {sourcemaps: true})),
    gulpif( process.env.NODE_ENV == 'production', 
      gzip({
        deleteMode: 'dist/styles',
        append: true,
        skipGrowingFiles: true,
        gzipOptions: {
          level: 9,
          memLevel: 9
        }
    })),
    gulpif( process.env.NODE_ENV == 'production', dest('dist/styles')),
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
    src('src/ts/plugins/**/*.js'),
    concat('index.js'),
    uglify(),
    rename({suffix: '.min'}),
    gulpif( process.env.NODE_ENV !== 'production', sourcemaps.init({loadMaps: true})),
    dest('dist/scripts', gulpif( process.env.NODE_ENV !== 'production', {sourcemaps: true})),
    sync.stream()
  );
}

export const img = series(optimizeImg, responsiveImg);

export function optimizeImg() {
  return pump(
    src('src/images/optimize/**/*.{png,gif,jpg,jpeg,svg}'),
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
  );
}

export default function responsiveImg() {
  return pump(
    src([
      'src/images/**/*.{jpg,jpeg}',
      '!src/images/optimize/**/*',
      '!src/images/pre-op/**/*'
    ]),
    cache([
      'src/images/**/*.{jpg,jpeg}',
      '!src/images/optimize/**/*',
      '!src/images/pre-op/**/*'
    ], {
      optimizeMemory: true
    }),
    responsive({'*.{jpg,jpeg}': [ //example settings
      { 
        width: xs,
        rename: {suffix: `-${xs}w`, extname: '.jpg'}
      }, { 
        width: sm,
        rename: {suffix: `-${sm}w`, extname: '.jpg'}
      }, {
        width: md,
        rename: {suffix: `-${md}w`, extname: '.jpg'}
      }, {
        width: lg,
        rename: {suffix: `-${lg}w`, extname: '.jpg'}
      }, {
        width: xl,
        rename: {suffix: `-${xl}w`, extname: '.jpg'}
      }, {
        width: xs * 3,
        rename: {suffix: `-${xs}w@3x`, extname: '.jpg'}
      }, 
      ...
      {
        width: md * 2,
        rename: {suffix: `-${md}w@2x`, extname: '.webp'}
      }, {
        width: lg * 2,
        rename: {suffix: `-${lg}w@2x`, extname: '.webp'}
      }, {
        width: xl * 2,
        rename: {suffix: `-${xl}w@2x`, extname: '.webp'}
      }, {
        width: md * 4,
        rename: {suffix: `-${md}w@4x`, extname: '.webp'}
      }  
    ]},
    {
      progressive: true,
      quality: 60,
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      errorOnEnlargement: false
    }),
    dest('dist/images')
  );
}

export function buildSitemap() {
  return pump(
    src('dist/*.html', {read: false}),
    sitemap({
      siteUrl: 'http://www.example-site.com'
    }),
    dest('dist')
  );
}

export function watch() {
	watchfiles('src/html/**/*.html', html);
  watchfiles('src/sass/**/*.scss', sassy);
  watchfiles('src/ts/**/*.ts', ts);
  watchfiles([
    'src/images/**/*.{jpg,jpeg}',
    'src/images/optimize/**/*.{png,gif,jpg,jpeg,svg}',
    'src/images/pre-op/**/*.{png,gif,jpg,jpeg,svg}'
    ],
    series(img, sassy, html)
  );
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

export const build = gulpif( process.env.NODE_ENV !== 'production',
  series(clean, img, buildTs, buildSass, buildHtml),
  series(clean, img, buildTs, buildSass, buildHtml, buildSitemap, cleanTs));

export const all = gulpif( process.env.NODE_ENV !== 'production',
  series(lint, build, serve, watch), build);

export default all;
```

#### Responsive Images Notes:
- Gulp Inject categorizes files A-Z then a-z. Files in `src/images` should be renamed to upper OR lower case names. 
- Settings for Image Sizes, break points, Alt Tags and String Selection are located in `gulpfile.babel.js`
- Six example Strings are located in `string-img-sets.js`.
- Six sets of corresponding Image Resizing settings accompany each example string.
- [Vanilla LazyLoad](https://www.npmjs.com/package/vanilla-lazyload) settings are required for Lazy Loading Strings.
- There are additional CSS settings here that are useful to display Images properly as well.
- include `lazyload.js`, and `intersection-observer.js` in `src/js/plugins`.
- WARNING: Do not edit images intended for responsive directly in `src/images` while being watched. Copy into folder instead.

As only one image string can be used per run, for multiple image types:
- Copy preferred `.html` image or picture tags from `dist` into the source `.html`.
- Copy matching preferred Image 'sets' into `src/images/pre-op`.

Include in your `.html` files before the closing `</body>` tag.

```html
<!-- inject:js -->
<!-- endinject -->
<script> // Initialize Lazy Load
var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});
</script>
```

Include comments in your `.html` files (one set for each `.jpg` and `jpeg`).

```html
<!-- inject:img1 -->
<!-- endinject -->

<!-- inject:img2 -->
<!-- endinject -->

3, 4 ,5 etc...
```

#### Other Notes:
- Errors and warnings reported by Stylelint will not halt remaining processes in a task or series.
- Previously Optimized Images may increase in size. Use an images sub-folder `src/images/pre-op`

Setting `NODE_ENV` in your terminal:
- iOS/Linux: `export NODE_ENV=production`.
- Windows: `SET NODE_ENV=production`.

Critical: Include a link to your `.css` in your `.html` files.

```html
<link rel="stylesheet" href="styles/index.min.css">
```

Post CSS Assets: Include in your `.scss` files for each image.

```css
.myimage {
  background-image: resolve('example.jpg');
  width: width('example.jpg');
  height: height('example.jpg');
  background-size: size('example.jpg');
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise browser-sync gulp-htmlmin gulp-htmllint gulp-sass stylelint-scss gulp-stylelint stylelint stylelint-config-standard stylelint-order gulp-autoprefixer gulp-rename gulp-tslint tslint typescript browserify tsify vinyl-source-stream vinyl-buffer gulp-uglify gulp-sourcemaps gulp-imagemin gulp-changed del gulp-if critical gulp-purgecss gulp-inject gulp-postcss postcss-assets gulp-gzip gulp-sitemap gulp-responsive gulp-base64-inline gulp-cached gulp-concat`
- Used `gulp-imagemin@7.0.0`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for SASS sources in `src/sass`.
- Additional Configuration for TS sources in `src/ts`.
- Additional Configuration for Image sources in `src/images`, `src/images/optimize` and `src/images/pre-op`.

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
- A `responsiveImg` Task.
- A `buildSitemap` Task.
- A `cleanHtml` Task.
- A `cleanSass` Task.
- A `cleanTs` Task.

- An `html` Task that uses `cleanHtml`, `lintHtml` and `buildHtml`.
- A `sassy` Task that uses `cleanSass`, `lintSass` and `buildSass`.
- A `ts` Task that uses `cleanTS`, `lintTs` and `buildTs`.
- An `img` Task that uses `optimizeImg` and `responsiveImg`.
- A `lint` Task that uses `lintHtml`, `lintSass` and `lintTs`.

Development:
- A `build` Task that uses `clean`, `img`, `buildTs`, `buildSass`, and `buildHtml`.
- A default `all` Task that uses `lint`, `build`, `serve` and `watch`.

Production:
- A `build` Task that uses `clean`, `img`, `buildTs`, `buildSass`, `buildHtml`, `buildSitemap`, and `cleanTs`.
- A default `all` Task that uses `build`.

### Files

- An `.htmllintrc` file for configuring `htmllint`.
- A `.stylelintrc.yaml` file for configuring `stylelint`.
- A `tslint.yaml` file for configuring `tslint`.
- A `tsconfig.json` file for configuring TS compiling options.
- A `string-img-sets.js` file for configuring responsive Strings and Images.

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
- [gulp-if](https://www.npmjs.com/package/gulp-if)
- [critical](https://www.npmjs.com/package/critical)
- [gulp-purgecss](https://www.npmjs.com/package/gulp-purgecss)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
- [gulp-postcss](https://www.npmjs.com/package/gulp-postcss)
- [postcss-assets](https://www.npmjs.com/package/postcss-assets)
- [gulp-gzip](https://www.npmjs.com/package/gulp-gzip)
- [gulp-sitemap](https://www.npmjs.com/package/gulp-sitemap)
- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
- [gulp-base64-inline](https://www.npmjs.com/package/gulp-base64-inline)
- [gulp-cached](https://www.npmjs.com/package/gulp-cached)
