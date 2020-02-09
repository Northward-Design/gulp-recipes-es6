Gzip HTML Ingredient
================================================================================

An HTML Compression Task.

- Compresses and Minifies all `.html` files from `src/html` to `dist`.
- Creates a minified copy, and a compressed and minified copy with the extension `.gz`.
- Will not create compressed copy if it is larger than minified version.
- Deletes previous version of `.gz` file if it did not create new compressed copy.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import htmlmin from 'gulp-htmlmin';
import gzip from 'gulp-gzip';

export default function buildHtml() {
  return pump(
    src('src/html/**/*.html'),
    htmlmin({
    	collapseWhitespace: true,
    	removeComments: true
    }),
    dest('dist'),
		gzip({
			append: true, 
  		skipGrowingFiles: true,
  		deleteMode: 'dist',
  		gzipOptions: {level: 9, memLevel: 9}
		}),
    dest('dist'),
  );
}

```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-htmlmin gulp-gzip`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A default `buildHtml` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [@babel/core](https://www.npmjs.com/package/@babel/core/)
- [@babel/register](https://www.npmjs.com/package/@babel/register/)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)
- [gulp-gzip](https://www.npmjs.com/package/gulp-gzip)
