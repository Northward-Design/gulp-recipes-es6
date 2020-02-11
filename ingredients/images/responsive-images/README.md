Responsive Image Ingredient
================================================================================

A Responsive Image Task.

- Resizes all `.jpg`, `.jpeg`, `.png`, `.tiff`, and `.webP` images from `src/images` to `dist/images`.
- Creates multiple sizes, and suffixes them.
- Reduces only, does not enlarge. Settings for `.tiff` and `.webP` not included

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import { default as responsive } from 'gulp-responsive';

export default function responsiveImg() {
  return pump(
    src('src/images/**/*.{png,jpg,jpeg,tiff,webP}'),
    responsive({
      '*.{jpg,jpeg}': [
        {
          width: 150,
          rename: {
            suffix: '-150w'
          }
        },
        {
          width: 300,
          rename: {
            suffix: '-300w'
          }
        }
      ],
      '*.png':{
        width: 600,
        rename: {
          suffix: '-600w'
        }
      }
    },
    {
      quality: 100,
      compressionLevel: 1,
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false
    }),
    dest('dist/images')
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-responsive`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- A default `responsiveImg` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
