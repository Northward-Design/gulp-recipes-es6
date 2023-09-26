Data URL Images Ingredient
================================================================================

An Data URL Images Task.

- Converts selected images in `.html` files to Base64 from `src/html` to `dist`. 

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import base64 from 'gulp-base64-inline';

export default function inlineImg() {
  return pump(
    src('src/html/**/*.html'),
    base64('src/images', {
      prefix: "",
      suffix: ""
    }),
    dest('dist')
  );
}

```

Include in your `.html` file(s) for each image (keep them under 10Kb):

```html
<img src="inline('file-name.png')">
```

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-base64-inline`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for Image sources in `src/images`.
- A default `inlineImage` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-base64-inline](https://www.npmjs.com/package/gulp-base64-inline)
