Optimize Images Ingredient
================================================================================

An Image Optimization Task.

- Optimizes all `.jpg`, `.jpeg`, `.png`, `.gif`, and `.svg` images from `src/images` to `dist/images`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import imagemin, {gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

export default function optimizeImg() {
  return pump(
    src('src/images/**/*.{png,gif,jpg,jpeg,svg}'),
    imagemin([
      gifsicle({
        optimizationLevel: 3, 
        interlaced: true
      }),
      mozjpeg({
        quality: 75, 
        progressive: true
      }),
      optipng({
        optimizationLevel: 5
      }),
      svgo({
        plugins:[{
          name: 'removeViewBox',
          active: true
        }]
      })
    ],
    {verbose: true}
    ),
    dest('dist/images')
  );
}

```

Images that are already optimized may increase in size due to custom settings. A work around moves pre-optimized files from a sub-folder to images folder:
```javascript
//...
return pump(
  src(['src/images/**/*.{png,gif,jpg,jpeg,svg}', '!src/images/optimized/**/*']),
  imagemin(*OPTIONS*),
  src('src/images/optimized/**/*'),
  dest('dist/images')
);
//...
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-imagemin`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- A default `optimizeImg` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
