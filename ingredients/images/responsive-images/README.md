Responsive Image Ingredient
================================================================================

A Responsive Image Task.

- Resizes all `.jpg`, `.jpeg`, `.png`, and `.tiff` images from `src/images` to `dist/images`.
- Creates multiple sizes, and suffixes them.
- Converts `.jpg` and `.jpeg` to `.jpg` and `.webp` formats.
- Reduces only, does not enlarge. Settings for `.tiff` not included

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import { default as responsive } from 'gulp-responsive';

export default function responsiveImg() {
  return pump(
    src('src/images/**/*.{png,jpg,jpeg}'),
    responsive({
      '*.{jpg,jpeg}': [
        {
          width: 50,
          rename: {
            suffix: '-50w',
            extname: '.jpg'
          }
        },
        {
          width: 800,
          rename: {
            suffix: '-800w',
            extname: '.jpg'
          }
        },
        {
          width: 800 * 2,
          rename: {
            suffix: '-800w@x2',
            extname: '.jpg'
          }
        },
        ...
        {
          width: 1600 * 2,
          rename: {
            suffix: '-1600w@x2',
            extname: '.webp'
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
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-responsive`

If gulp-responsive doesn't install try `aidanmontare/gulp-responsive`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- A default `responsiveImg` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
Alternative:
- [aidanmontare/gulp-responsive](https://github.com/AidanMontare/gulp-responsive)
