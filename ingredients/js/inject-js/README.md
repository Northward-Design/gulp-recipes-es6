Inject JS Ingredient
================================================================================

An Injection Task

- Injects file contents from `dist/scripts/index.js` into all `.html` files from `src/html` to `dist`.

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
    inject(src(['dist/scripts/index.js']), {
      removeTags: true,
      transform: (filePath, file) => {
        return '<script>'+file.contents.toString()+'</script>';
      };
    }),
    dest('dist')
  );
}
```

Include in your `.html` files before the closing `</body>` tag.

```html
<!-- inject:js -->
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
- Additional Configuration for JS sources in `dist/scripts`.
- A default `injection` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
