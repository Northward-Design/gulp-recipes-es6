Gzip JS Ingredient
================================================================================

A JS Compression Task.

- Compresses and Minifies all `.js` files from `src/js` to `dist/scripts`.
- Creates a minified copy, and a compressed and minified copy with the extension `.gz`.
- Will not create compressed copy if it is larger than minified version.
- Deletes previous version of `.gz` file if it did not create new compressed copy.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import uglify from 'gulp-uglify';
import gzip from 'gulp-gzip';

export default function buildJs() {
  return pump(
    src('src/js/**/*.js'),
    uglify(),
    dest('dist/scripts'),
		gzip({
			append: true, 
  		skipGrowingFiles: true,
  		deleteMode: 'dist/scripts',
  		gzipOptions: {level: 9, memLevel: 9}
		}),
    dest('dist/scripts')
  );
}

```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-uglify gulp-gzip`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for JS sources in `src/js`.
- A default `buildJs` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-gzip](https://www.npmjs.com/package/gulp-gzip)
