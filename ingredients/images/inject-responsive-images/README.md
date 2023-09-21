Inject Responsive Images Ingredient
================================================================================

An Inject Responsive Images Task.

- Copies `.jpg` and `.jpeg` file names from `src/images`.
- Interpolates file paths, names, alt, media queries, and image widths in a large string.
- Injects string(s) (based on the number of image files) into `.html` from `src/html` to `dist`.
- Strings can be srcset or Lazy Load srcset, read below for Lazy Load requirements.
- Resizes all `.jpg` and `.jpeg` images from `src/images` to `dist/images`.
- Creates a set of multiple sizes with the same width settings mentioned before, and suffixes them.
- Converts `.jpg` and `.jpeg` to `.jpg` and `.webp` formats. Reduces only, does not enlarge.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src } = gulp;
import { default as pump } from 'pump-promise';

import { default as responsive } from 'gulp-responsive';
import inject from 'gulp-inject';

import strimg from './string-img-sets.js';

export function responsiveImg() {
  return pump(
    src('src/images/**/*.{jpg,jpeg}'),
    responsive({'*.{jpg,jpeg}': [ //example settings
    { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.jpg'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.jpg'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.jpg'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.jpg'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.jpg'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@3x`, extname: '.jpg'}
    }, 
    ...
    {
      width: md * 2,
      rename: {suffix: `-${md}w@2x`, extname: '.webp'}
    }, {
      width: lg * 2,
      rename: {suffix: `-${lg}w@2x`, extname: '.webp'}
    }, {
      width: xl * 2,
      rename: {suffix: `-${xl}w@2x`, extname: '.webp'}
    }, {
      width: md * 4,
      rename: {suffix: `-${md}w@4x`, extname: '.webp'}
    }  
  ]},
    {
      progressive: true,
      quality: 60,
      compressionLevel: 9,
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      errorOnEnlargement: false
    }),
    dest('dist/images')
  );
}

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

export const all = parallel(responsiveImg, injection);

export default all;
```
Notes:
- Gulp Inject categorizes image file names A-Z then a-z (AB then Aa). Files in `src/images` could be renamed to upper OR lower case.  
- Settings for Image Sizes, break points, Alt Tags and String Selection are located in `gulpfile.js`.
- Six example Strings are located in `string-img-sets.js`.
- Six sets of corresponding Image Resizing settings accompany each example string.
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

`npm install --save-dev gulp pump-promise gulp-inject gulp-responsive`

If gulp-responsive doesn't install try `aidanmontare/gulp-responsive`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- Additional Configuration for HTML sources in `src/html`.
- A `responsiveImg` Task.
- A `injection` Task.
- A default `all` Task that uses `injection` and `responsiveImg`.
- A `string-img-sets.js` file for configuring responsive Strings and Images.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
- [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
Alternative:
- [aidanmontare/gulp-responsive](https://github.com/AidanMontare/gulp-responsive)
