Watch Optimized Images Ingredient
================================================================================

An Image Watch and Optimize Task.

- Watches all image files in `src/images`.
- Optimizes all `.jpg`, `.jpeg`, `.png`, `.gif`, and `.svg` images from `src/images` to `dist/images`.
- Only newly added or changed files will be optimized. 

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
import { default as pump } from 'pump-promise';

import imagemin, {gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import { default as changed } from 'gulp-changed';

export function optimizeImg() {
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

export function watchFiles() {
    watch('src/images/**/*.{png,gif,jpg,jpeg,svg}', optimizeImg);
}

export const all = series(optimizeImg, watchFiles);

export default all;
```

Images that are already optimized may increase in size due to custom settings. A work around moves pre-optimized files from a sub-folder to images folder:
```javascript
//...
return pump(
  src(['src/images/**/*.{png,gif,jpg,jpeg,svg}', '!src/images/optimized/**/*']),
  changed('dist/images'),
  imgmin(*OPTIONS*),
  src('src/images/optimized/**/*'),
  changed('dist/images'),
  dest('dist/images')
);
//...
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-imagemin gulp-changed`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- An `optomizeImg` Task.
- A `watchFiles` Task.
- A default `all` Task that uses `optomizeImg` and `watchFiles`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [gulp-changed](https://www.npmjs.com/package/gulp-changed)
