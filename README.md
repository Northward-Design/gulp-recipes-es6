Gulp ES6 Recipes
================================================================================

A Collection of [Gulp.js](https://gulpjs.com/) Recipes in ES6

Overview
--------------------------------------------------------------------------------

### Recipes

Recipes combine multiple Ingredients together, and are designed to be copied into new projects.

### Ingredients

Most Ingredients complete a single task.
Watch, Browsersync and some Image Ingredients contain multiple tasks.

### Configuration

Configuration is stored in `config`.

The following properties are included in the basic configuration.
```javscript
config.root      // The project root.
config.env       // Relevant environment variables.
config.src       // The project source paths/directories/globs.
config.src.root  // The project source directory.
config.dist       // The project distribution directories.
config.dist.root  // The project distribution directory.
config.clean     // The paths of generated files and directories for cleanup.
config.plugins   // Gulp plug-in configurations.
```

Additional configuration can be performed by adding additional properties to
`config.src`, `config.dist`, `config.plugins` etc..

Index
--------------------------------------------------------------------------------

### Recipes

#### Essential Ingredients

- [Basic Web (HTML, CSS, and JS)](recipes/basic-web)
	- Clean, Watch, and Sync Browser.
	- HTML: Lint and Minify.
	- CSS: Lint, Prefix, and Minify with Source Maps.
	- JS: Lint, Bundle, Transpile, and Minify with Source Maps.
	- Images: Optimize (jpg/jpeg, png, svg, gif).

- [Sassy Web (HTML, SASS, and JS)](recipes/sassy-web)
	- Clean, Watch, and Sync Browser.
	- HTML: Lint and Minify.
	- SASS: Lint, Compile, Prefix, and Minify with Source Maps.
	- JS: Lint, Bundle, Transpile, and Minify with Source Maps.
	- Images: Optimize (jpg/jpeg, png, svg, gif).

- [Modern Web (HTML, SASS, and TS)](recipes/modern-web)
	- Clean, Watch, and Sync Browser.
	- HTML: Lint and Minify.
	- SASS: Lint, Compile, Prefix, and Minify with Source Maps.
	- TS: Lint, Bundle, Compile, and Minify with Source Maps.
	- Images: Optimize (jpg/jpeg, png, svg, gif).

#### Advanced Ingredients (Development/Production)

- [Advanced Sassy Web (HTML, SASS, and JS)](recipes/advanced-sassy-web)
	- Includes Sassy Web Recipe with:
	- HTML: Injected JS, and Gzip.
	- CSS: Purge, Critical, PostCSS Assets, and Gzip.
	- Generate Sitemap.

- [Advanced Modern Web (HTML, SASS, and TS)](recipes/advanced-modern-web)
	- Includes Modern Web Recipe with:
	- HTML: Injected JS, and Gzip.
	- CSS: Purge, Critical, PostCSS Assets, and Gzip.
	- Generate Sitemap.

#### Advanced Images (Development/Production)

- [Responsive Sassy Web (HTML, SASS, and JS with Inject Responsive Images)](recipes/responsive-sassy-web)
	- Includes Advanced Sassy Web Recipe with:
	- HTML: Inject Image Strings, in-line base64 miniature images.
	- JS: Concatenate.
	- Images: Responsive Image Sets.

- [Responsive Modern Web (HTML, SASS, and TS with Inject Responsive Images)](recipes/responsive-modern-web)
	- Includes Advanced Modern Web Recipe with:
	- HTML: Inject Image Strings, in-line base64 miniature images.
	- TS: Concatenates JS Plugins.
	- Images: Responsive Image Sets.

### Ingredients

- [Base](ingredients/base)
- [Clean](ingredients/clean)
- HTML
	- [Lint HTML](ingredients/html/lint-html)
	- [Minify HTML](ingredients/html/minify-html)
	- [Inject HTML](ingredients/html/inject-html)
	- [Gzip HTML](ingredients/html/gzip-html)
	- [Watch HTML](ingredients/html/watch-html)
	- [BrowserSync HTML](ingredients/html/browsersync-html)
- CSS
	- [Lint CSS](ingredients/css/lint-css)
	- [Autoprefix CSS](ingredients/css/autoprefix-css)
	- [Autoprefix CSS with Source Maps](ingredients/css/autoprefix-css-source-maps)
	- [Minify CSS](ingredients/css/minify-css)
	- [Minify CSS with Source Maps](ingredients/css/minify-css-source-maps)
	- [Gzip CSS](ingredients/css/gzip-css)
	- [Inject CSS](ingredients/css/inject-css)
	- [Critical CSS](ingredients/css/critical-css)
	- [Purge CSS](ingredients/css/purge-css)
	- [PostCSS Assets](ingredients/css/post-assets-css)
	- [Watch CSS](ingredients/css/watch-css)
	- [BrowserSync CSS](ingredients/css/browsersync-css)
- SASS
	- [Lint SASS](ingredients/sass/lint-sass)
	- [Compile SASS](ingredients/sass/compile-sass)
	- [Compile SASS with Source Maps](ingredients/sass/compile-sass-source-maps)
	- [Minify SASS](ingredients/sass/minify-sass)
	- [Minify SASS with Source Maps](ingredients/sass/minify-sass-source-maps)
	- [Watch SASS](ingredients/sass/watch-sass)
	- [BrowserSync SASS](ingredients/sass/browsersync-sass)
- JS
	- [Lint JS](ingredients/js/lint-js)
	- [Minify JS](ingredients/js/minify-js)
	- [Minify JS with Source Maps](ingredients/js/minify-js-source-maps)
	- [Browserify JS](ingredients/js/browserify-js)
	- [Browserify JS with Source Maps](ingredients/js/browserify-js-source-maps)
	- [Babel JS](ingredients/js/babel-js)
	- [Babel JS with Source Maps](ingredients/js/babel-js-source-maps)
	- [Browserify and Babelify JS](ingredients/js/browserify-babelify-js)
	- [Concatenate JS](ingredients/js/concatenate-js)
	- [Concatenate JS with Source Maps](ingredients/js/concatenate-js-source-maps)
	- [Inject JS](ingredients/js/inject-js)
	- [Gzip JS](ingredients/js/gzip-js)
	- [Watch JS](ingredients/js/watch-js)
	- [BrowserSync JS](ingredients/js/browsersync-js)
- TS
	- [Lint TS](ingredients/ts/lint-ts)
	- [Compile TS](ingredients/ts/compile-ts)
	- [Compile TS with Source Maps](ingredients/ts/compile-ts-source-maps)
	- [Minify TS](ingredients/ts/minify-ts)
	- [Minify TS with Source Maps](ingredients/ts/minify-ts-source-maps)
	- [Browserify TS](ingredients/ts/browserify-ts)
	- [Browserify TS with Source Maps](ingredients/ts/browserify-ts-source-maps)
	- [Watch TS](ingredients/ts/watch-ts)
	- [BrowserSync TS](ingredients/ts/browsersync-ts)
- PHP
	- [Connect and BrowserSync PHP](ingredients/php/connect-browsersync-php)
	- [PHP HTML Connect](ingredients/php/php-html-connect)
- Images
	- [Optimize Images](ingredients/images/optimize-images)
	- [Responsive Images](ingredients/images/responsive-images)
	- [Inject Images](ingredients/images/inject-images)
	- [Inject Responsive Images](ingredients/images/inject-responsive-images)
	- [Data URL Images](ingredients/images/data-url-images)
	- [Watch Images](ingredients/images/watch-images)
- [Sitemap Generator](ingredients/sitemap-generator)
- [If Conditional](ingredients/if-conditional)
