PostCSS Assets Ingredient
================================================================================

A PostCSS Assets Task.

- Images from `dest/images` relative paths and sizes are in-lined into all `.css` files from `src/css` to `dist/styles`.


Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import postcss from 'gulp-postcss';
import assets from 'postcss-assets';

export default function buildCss() {
  return pump(
    src('src/css/**/*.css'),
    postcss([
      assets({
        loadPaths: ['dist/images'],
        relative: 'dist/styles'
      })
    ]),	
    dest('dist/styles')
  );
}
```

Example CSS
--------------------------------------------------------------------------------

Before:
```css
.myimage {
  background-image: resolve('example.jpg');
  width: width('example.jpg');
  height: height('example.jpg');
  background-size: size('example.jpg');
}
```

After:
```css
.myimage {
  background-image: url('../../dist/images/example.jpg');
  width: 400px;
  height: 300px;
  background-size: 400px 300px;
}
```


Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-postcss postcss-assets`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for CSS sources in `src/css`.
- Additional Configuration for Image sources in `dist/images`.
- A default `buildCss` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [@babel/core](https://www.npmjs.com/package/@babel/core/)
- [@babel/register](https://www.npmjs.com/package/@babel/register/)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-postcss](https://www.npmjs.com/package/gulp-postcss)
- [postcss-assets](https://www.npmjs.com/package/postcss-assets)
