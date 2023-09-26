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
import gulp from 'gulp';
const { src } = gulp;
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

let imgcount = 0;

export default function injection() {
  return pump(
    src('src/html/**/*.html'),
    inject(
      src(['src/images/**/*.{jpg,jpeg}']),
      {
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
          return //example string
            ` <picture>
                <source
                  srcset="
                    ${path}-${xs}w.webp ${xs}w,
                    ${path}-${sm}w.webp ${sm}w,
                    ${path}-${md}w.webp ${md}w,
                    ${path}-${lg}w.webp ${lg}w,
                    ${path}-${xl}w.webp ${xl}w,
                    ${path}-${xs}w@3x.webp ${xs * 3}w,
                    ...
                <img class="${name}"
                  srcset="
                    ...
                    ${path}-${md}w@2x.jpeg ${md * 2}w,
                    ${path}-${lg}w@2x.jpeg ${lg * 2}w,
                    ${path}-${xl}w@2x.jpeg ${xl * 2}w,
                    ${path}-${md}w@4x.jpeg ${md * 4}w"
                  sizes="${xsScrn}"
                  src="${path}-${lg}w.jpg"
                alt="${alt}">
              </picture>`;
        }
      }
    ),      
    dest('dist')
  );
}
```
Notes:
- Gulp Inject categorizes image file names A-Z then a-z (AB then Aa). Files in `src/images` could be renamed to upper OR lower case.
- Image path and names are copied from `src/images`, but group of images used should be located in `dist/images`.
- - Settings for Image Sizes, break points, Alt Tags and String Selection are located in `gulpfile.js`.
- Six example Strings are located in `string-sets.js`.
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

`npm install --save-dev gulp pump-promise gulp-inject`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- Additional Configuration for Image sources in `dist/images`.
- Additional Configuration for HTML sources in `src/html`.
- A default `injection` Task.
A `string-img-sets.js` file for configuring responsive Strings.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
