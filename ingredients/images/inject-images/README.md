Inject Images Ingredient
================================================================================

An Inject Image Task.

- Copies `.jpg` and `.jpeg` file names from `src/images`.
- Interpolates file paths, names, alt and image widths in a large string.
- Injects string(s) (based on the number of image files) into `.html` from `src/html` to `dist`.
- Strings can be srcset or Lazy Load srcset, read below for Lazy Load requirements.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

let imgcount = 0;

export default function injection() {
  return pump(
    src('src/html/**/*.html'),
    inject(
      src(['src/images/**/*.{jpg,jpeg}']),
        ignorePath: '../',
        relative = true,
        removeTags = true,
        starttag: () => {
          imgcount++;
          return `<!-- inject:img${imgcount} -->`;
        },
        transform: (filepath) => {
          let pathName = filepath.substring(0, filepath.lastIndexOf('.'));
          let name = pathName.substring(pathName.lastIndexOf('/')+1);
          return `
            <picture>
              <source media="(min-width: ${lg}px)"
                data-srcset="
                  ${pathName}-${lg}w.webp,
                  ${pathName}-${lg}w@2x.webp 2x"
                type="image/webp">
              ...
              <img class="lazy ${name}"
                data-srcset="
                  ${pathName}-${sm}w.jpg,
                  ${pathName}-${sm}w@2x.jpg 2x"
                data-src="${pathName}-${mini}w.jpg"
              alt="${alt[0]}">
            </picture>`;
        }
      ),      
    dest('dist')
  );
}
```
Notes:
- Gulp Inject categorizes files A-Z then a-z. Files in `src/images` should be renamed to upper OR lower case names.
- Image path and names are copied from `src/images`, but group of images used should be located in `dist/images`.
- Settings for Image Sizes, Alt Tags and String Selection are located in `gulpfile.babel.js`
- Six example Strings are located in `htmlstrings.js`
- [Vanilla LazyLoad](https://www.npmjs.com/package/vanilla-lazyload) settings are required for Lazy Loading Strings.

Include comments in your `.html` files (one set for each `.jpg` and `jpeg`).

```html
<!-- inject:img1 -->
<!-- endinject -->

<!-- inject:img2 -->
<!-- endinject -->

3, 4 ,5 etc...
```
Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-inject`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- Additional Configuration for Image sources in `dist/images`.
- Additional Configuration for HTML sources in `src/html`.
- A default `injection` Task.
- An `htmlstrings.js` file, containing 3 srcset and 3 [Vanilla LazyLoad](https://www.npmjs.com/package/vanilla-lazyload) srcset Interpolated HTML Strings.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
