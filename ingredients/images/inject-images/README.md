Inject Images Ingredient
================================================================================

An Inject Image Task.

- Copies `.jpg` and `.jpeg` file names from `src/images`.
- Interpolates file names in a long html string.
- Injects string(s) (based on the number of image files) into `.html` from `src/html` to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

let imgcount = 0;

export default function injection() {
  return pump(
    src('src/html/**/*'),
    inject(
      src(['images/**/*.{jpg,jpeg}']),
        ignorePath: '../',
        relative = true,
        removeTags = true,
        starttag: () => {
          imgcount++;
          return `<!-- inject:img${imgcount} -->`;
        },
        transform: (filepath) => {
          let fileName = filepath.substring(0, filepath.lastIndexOf('.'));
          return `
            <picture>
              <source media="(min-width: 1600px)"
                data-srcset="
                  ${fileName}-1600w.webp,
                  ${fileName}-1600w@2x.webp 2x"
                type="image/webp">
              ...
              <img class="lazy"
                data-srcset="
                  ${fileName}-800w.jpg,
                  ${fileName}-800w@2x.jpg 2x" 
                data-src="${fileName}-50w.jpg"
              alt="my images">
            </picture>`;
        }
      ),      
    dest('dist')
  );
}
```
Notes:
- `removeTags` setting not required when using [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin).
- inject categorizes files A-Z then a-z. Files in `src/images` should be renamed to upper OR lower case names. 

Include comments in your `.html` files (one set of for each `.jpg` and `jpeg`).

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
- Additional Configuration for HTML sources in `src/html`.
- A default `injection` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
