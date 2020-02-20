Watch Images Ingredient
================================================================================

An Image Watch and Optimize Task.

- Watches all image files in `src/images`.
- Optimizes all `.jpg`, `.jpeg`, `.png`, `.gif`, and `.svg` images from `src/images` to `dist/images`.
- Only newly added or changed files will be optimized. 

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import { default as imgmin } from 'gulp-imagemin';
import { default as changed } from 'gulp-changed';

export function optimizeImg() {
  return pump(
    src('images/**/*.{png,gif,jpg,jpeg,svg}'),
    changed('dist/images'),
    imgmin([
      imgmin.gifsicle({
        optimizationLevel: 3, 
        progressive: true
      }),
      imgmin.mozjpeg({
        quality: 75, 
        progressive: true
      }),
      imgmin.optipng({
        optimizationLevel: 5
      }),
      imgmin.svgo({
        plugins:[{
            removeViewBox: true
        }]
      })
    ],
    {verbose: true}
    ),
    dest('dist/images')
  );
}

export function watch() {
    watchfiles('images/**/*.{png,gif,jpg,jpeg,svg}', optimizeImg);
}

export const all = series(optimizeImg, watch);

export default all;
```

Pre-Optimized Images may increase in size. A work around (moves pre-optimized files from a sub-folder to images folder):
```javascript
//...
return pump(
src(['src/images/**/*.{png,gif,jpg,jpeg,svg}', '!src/images/optimized/**/*']),
changed('dist/images'),
imgmin(*OPTIONS*),
src('src/images/optimized/**/*'),
dest('dist/images')
);
//...
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-imagemin gulp-changed`
Note: Used `gulp-imagemin@7.0.0`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- An `optomizeImg` Task.
- A `Watch` Task.
- A default `all` Task that uses `optomizeImg` and `Watch`.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [gulp-changed](https://www.npmjs.com/package/gulp-changed)
