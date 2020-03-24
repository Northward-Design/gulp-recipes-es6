Inject HTML Ingredient
================================================================================

An HTML Injection Task

- Injects selected `.html` partials from `src/partials` into all `.html` files from `src/html` to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

export default function injection() {
    return pump(
    src('src/html/**/*.html'),
    inject(src(['src/partials/head.html']), {
        name: 'head',
    	removeTags: true,
    	transform: (filePath, file) => {
    	   return file.contents.toString('utf8');
    	};
    }),
    inject(src(['src/partials/header.html']), {
        name: 'header',
        removeTags: true,
        transform: (filePath, file) => {
            return file.contents.toString('utf8');
        };
    }),
    inject(src(['src/partials/footer.html']), {
        name: 'footer',
        removeTags: true,
        transform: (filePath, file) => {
            return file.contents.toString('utf8');
        };
    }),
    dest('dist')
  );
}
```
Notes:
- Partials used, require the same name as `name` setting (unless changed) for gulp-inject: `head.html`, `header.html`, and `footer.html`.

Include in your `.html` files between `<head>`, `<header>` and `<footer>` tags.

```html
<!-- head:html -->
<!-- endinject -->

<!-- header:html -->
<!-- endinject -->

<!-- footer:html -->
<!-- endinject -->
```


Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-inject`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for HTML sources in `src/partials`.
- A default `injection` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
