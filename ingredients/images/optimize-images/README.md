Optimize Images Ingredient
================================================================================

An Image Optimization Task.

- Optimizes all `.jpg`, `.jpeg`, `.png`, `.gif`, and `.svg` images from `src/images` to `dist/images`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import { default as imgmin } from 'gulp-imagemin';

export default function optimizeImg() {
  return pump(
    src('src/images/**/*.{png,gif,jpg,jpeg,svg}'),
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

```

Pre-Optimized Images may increase in size. A work around (moves pre-optimized files from a sub-folder to images folder):
```javascript
//...
return pump(
src(['src/images/**/*.{png,gif,jpg,jpeg,svg}', '!src/images/optimized/**/*']),
imgmin(*OPTIONS*),
src('src/images/optimized/**/*'),
dest('dist/images')
);
//...
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-imagemin`
- Used `gulp-imagemin@7.0.0`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for Image sources in `src/images`.
- A default `optimizeImg` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
