Inject CSS Ingredient
================================================================================

A CSS Injection Task

- Injects file contents from `dist/styles/index.css` into all `.html` files from `src/html` to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

export default function injection() {
  return pump(
    src('src/html/**/*.html'),
    inject(src(['dist/styles/index.css']), {
    	removeTags: true,
        transform: (filePath, file) => {
            return '<style>'+file.contents.toString()+'</style>';
    	};
    }),
    dest('dist')
  );
}
```

Include in your `.html` files between the `<head>` tags.

```html
<!-- inject:css -->
<!-- endinject -->
```


Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-inject`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for CSS sources in `dist/styles`.
- A default `injection` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
