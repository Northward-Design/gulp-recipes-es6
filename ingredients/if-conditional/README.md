If Conditional Ingredient
================================================================================

An If Conditional Task

- Copies all `.html` files from `src/html` to either `temp` or `dist`.
- Default will copy to `temp`.
- Only copies to `dist` when `NODE_ENV` is set to `production`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-if`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- A default `query` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-if](https://www.npmjs.com/package/gulp-if)
