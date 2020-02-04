Gulp ES6 Recipes
================================================================================

A Collection of [Gulp.js](https://gulpjs.com/) Recipes in ES6

Overview
--------------------------------------------------------------------------------

### Recipes

Recipes combine multiple Ingredients together, and are designed to be copied into new projects.

### Ingredients

Ingredients complete a single task.

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

- [Basic Web (HTML, CSS, and JS)]()
- [Modern Web (HTML, SCSS, and TS)]()

### Ingredients

- [Base](ingredients/base)
- [Clean](ingredients/clean)
- HTML
	- [Lint HTML](ingredients/html/lint-html)
	- [Minify HTML](ingredients/html/minify-html)
	- [Watch HTML](ingredients/html/watch-html)
	- [BrowserSync HTML](ingredients/html/browsersync-html)
- CSS
	- [Lint CSS](ingredients/css/lint-css)
	- [Autoprefix CSS](ingredients/css/autoprefix-css)
	- [Autoprefix CSS with Sourcemaps](ingredients/css/autoprefix-css-source-maps)
	- [Minfy CSS](ingredients/css/minify-css)
	- [Minfy CSS with Sourcemaps](ingredients/css/minify-css-source-maps)
	- [Watch CSS](ingredients/css/watch-css)
	- [Inject CSS](ingredients/css/inject-css)
	- [Purge CSS](ingredients/css/purge-css)
	- [BrowserSync CSS](ingredients/css/browsersync-css)
- SASS
	- [Lint SASS](ingredients/sass/lint-sass)
	- [Compile SASS]()
	- [Compile SASS with Sourcemaps]()
	- [Minify SASS]()
	- [Minify SASS with Sourcemaps]()
	- [Watch SASS]()
	- [BrowserSync SASS]()
- JS
	- [Lint JS]()
	- [Minify JS]()
	- [Browserify JS]()
	- [Browserify JS with Sourcemaps]()
	- [Babel JS]()
	- [Babel JS with Sourcemaps]()
	- [Browserify and Babelify JS]()
	- [Watch JS]()
	- [Inject JS](ingredients/js/inject-js)
	- [BrowserSync JS]()
- TS
	- [Lint TS]()
	- [Compile TS]()
	- [Compile TS with Sourcemaps]()
	- [Minify TS]()
	- [Minify TS with Sourcemaps]()
	- [Browserify TS]()
	- [Watch TS]()
	- [BrowserSync TS]()
- PHP
	- [Connect and BrowserSync PHP]()
- Images
	- [Optimize Images]()
	- [Watch Images]()
