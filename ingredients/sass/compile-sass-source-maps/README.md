Compile SASS Ingredient with Source Maps
================================================================================

An SASS Compilation Task.

- Compiles all `.scss` files from `src/sass` to `dist/styles` using [gulp-sass](https://www.npmjs.com/package/gulp-sass).
- Creates an in-line Source Map in the `.css` file.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import sass from 'gulp-sass';

export default function buildSass() {
  return pump(
    src('src/sass/**/*.scss', {sourcemaps: true}),
    sass(),
    dest('dist/styles', {sourcemaps: true})
   );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-sass`

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
