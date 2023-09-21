If Conditional Ingredient
================================================================================

An If Conditional Task

- Copies all `.html` files from `src/html` to either `temp` or `dist`.
- Default will copy to `temp`.
- Only copies to `dist` when `NODE_ENV` is set to `production`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import gulpif from 'gulp-if';

export default function query() {
	return pump(
		src('src/html/**/*.html'),
    dest(gulpif( NODE_ENV !== 'production', 'temp', 'dist'))
	);
}
```

Setting `NODE_ENV` in your terminal:
- iOS/Linux: `export NODE_ENV=production`.
- Windows: `SET NODE_ENV=production`.

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-if`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A default `query` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-if](https://www.npmjs.com/package/gulp-if)
