Compile SASS Ingredient
================================================================================

A SASS Compilation Task.

- Compiles all `.scss` files from `src/sass` to `dist/styles`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);

export default function buildSass() {
  return pump(
    src('src/sass/**/*.scss'),
    sass(),
    dest('dist/styles')
   );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-sass sass`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for SASS sources in `src/sass`.
- A default `buildSass` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [sass](https://sass-lang.com/dart-sass)
