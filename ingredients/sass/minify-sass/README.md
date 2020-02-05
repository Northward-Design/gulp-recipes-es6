Minify SASS Ingredient
================================================================================

A SASS Compilation and Minification Task.

- Compiles and Minifies SCSS files from `src/sass` to `dist/styles` using [gulp-sass](https://www.npmjs.com/package/gulp-sass).
- Renames files to `*.min.css` using [gulp-rename](https://www.npmjs.com/package/gulp-rename).

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import sass from 'gulp-sass';

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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-sass gulp-rename`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for SASS sources in `src/sass`.
- A default `buildSass` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [@babel/core](https://www.npmjs.com/package/@babel/core/)
- [@babel/register](https://www.npmjs.com/package/@babel/register/)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
