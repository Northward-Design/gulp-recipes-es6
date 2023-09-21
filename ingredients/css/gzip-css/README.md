Gzip CSS Ingredient
================================================================================

A CSS Compression Task.

- Compresses and Minifies all `.css` files from `src/css` to `dist/styles`.
- Creates a minified copy, and a compressed and minified copy with the extension `.gz`.
- Will not create compressed copy if it is larger than minified version.
- Deletes previous version of `.gz` file if it did not create new compressed copy.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import { default as cleancss } from 'gulp-clean-css';
import gzip from 'gulp-gzip';

export default function buildCss() {
  return pump(
    src('src/css/**/*.css'),
    cleancss({compatibility: 'ie8'}),
    dest('dist/styles'),
		gzip({
			append: true, 
  		skipGrowingFiles: true,
  		deleteMode: 'dist/styles',
  		gzipOptions: {level: 9, memLevel: 9}
		}),
    dest('dist/styles')
  );
}

```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-clean-css gulp-gzip`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A default `buildCss` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-gzip](https://www.npmjs.com/package/gulp-gzip)
