Minify SASS Ingredient
================================================================================

A SASS Compilation and Minification Task.

- Compiles and Minifies all `.scss` files from `src/sass` to `dist/styles`.
- Renames files to `*.min.css`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);

export default function buildSass() {
  return pump(
    src('src/sass/**/*.scss'),
    sass({
    	errorLogToConsole: true,
    	outputStyle: 'compressed'
   	}),
    rename({suffix: '.min'}),
    dest('dist/styles')
   );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-rename gulp-sass sass`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for SASS sources in `src/sass`.
- A default `buildSass` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [sass](https://sass-lang.com/dart-sass)
