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

- [Base]()
- [HTML]()
	- [Lint HTML]()
	- [Minify HTML]()
	- [Watch HTML]()
	- [BrowserSync HTML]()
- [CSS]()
	- [Lint CSS]()
	- [Autoprefix CSS]()
	- [Autoprefix CSS with Sourcemaps]()
	- [Minfy CSS]()
	- [Minfy CSS with Sourcemaps]()
	- [Watch CSS]()
	- [Inject CSS]()
	- [Purge CSS]()
	- [BrowserSync CSS]()
- [SASS]()
	- [Lint SASS]()
	- [Compile SASS]()
	- [Compile SASS with Sourcemaps]()
	- [Minify SASS]()
	- [Minify SASS with Sourcemaps]()
	- [Watch SASS]()
	- [BrowserSync SASS]()
- [JS]()
	- [Lint JS]()
	- [Minify JS]()
	- [Browserify JS]()
	- [Browserify JS with Sourcemaps]()
	- [Babel JS]()
	- [Babel JS with Sourcemaps]()
	- [Browserify and Babelify JS]()
	- [Watch JS]()
	- [Inject JS]()
	- [BrowserSync JS]()
- [TS]()
	- [Lint TS]()
	- [Compile TS]()
	- [Compile TS with Sourcemaps]()
	- [Minify TS]()
	- [Minify TS with Sourcemaps]()
	- [Browserify TS]()
	- [Watch TS]()
	- [BrowserSync TS]()
- [PHP]
	- [Connect and BrowserSync PHP]()
- Images
	- [Optimize Images]()
	- [Watch Images]()
- [Clean]()
