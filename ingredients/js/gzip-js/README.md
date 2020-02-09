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
import { src, dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-uglify gulp-gzip`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for JS sources in `src/js`.
- A default `buildJs` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [@babel/core](https://www.npmjs.com/package/@babel/core/)
- [@babel/register](https://www.npmjs.com/package/@babel/register/)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-gzip](https://www.npmjs.com/package/gulp-gzip)
