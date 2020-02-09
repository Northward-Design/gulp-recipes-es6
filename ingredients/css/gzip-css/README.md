Gzip CSS Ingredient
================================================================================

A CSS Compression Task.

- Compresses and Minifies all `.CSS` files from `src/css` to `dist/styles`.
- Creates a minified copy, and a compressed and minified copy with the extension `.gz`.
- Will not create compressed copy if it is larger than minified version.
- Deletes previous version of `.gz` file if it did not create new compressed copy.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-clean-css gulp-gzip`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- A default `buildCss` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [@babel/core](https://www.npmjs.com/package/@babel/core/)
- [@babel/register](https://www.npmjs.com/package/@babel/register/)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-gzip](https://www.npmjs.com/package/gulp-gzip)
