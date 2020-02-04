Inject JS Ingredient
================================================================================

An Injection Task

- Injects file contents from `dist/scripts/index.js` into all `.html` files in `src/html`,
and Outputs the file to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

export default function injection() {
  return pump(
    src('src/html/**/*.html'),
    inject(src(['dist/scripts/index.js']), {
    	removeTags: true,
    	transform: function(filePath, file) {
    		return file.contents.toString();
    	};
    }),
    dest('dist')
  );
}
```
Note: `removeTags` setting not required when using [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin).

Include in your `.html` files between `<script>` tags.

```html
<!-- inject:js -->
<!-- endinject -->
```


Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-inject`

Includes
--------------------------------------------------------------------------------

### Tasks

- A default `injection` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
