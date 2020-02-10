Critical CSS Ingredient
================================================================================

A Critical CSS Task

- Compares selectors in all `.html` files from `src/html` with a(ll) `.css` file(s) in `dist/css`.
- Copies critical-path (above the fold) CSS and In-lines it into the `.html` files.
- Generates a script in all `.html` files to asynchronously load external `.css` file(s).
- Outputs all `.html` files to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import crit from 'critical';

export default function critical() {
  return pump(
    src('src/html/**/*.html'),
    crit({
    	css: [ 'dist/styles/index.css' ],
    	inline: true;
    	ignore: { atrule: [ '@font-face' ]},
    	dimensions: [{ height: 1440, width: 2560 }]
    }),
    dest('dist')
  );
}
```
Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise critical`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for CSS sources in `dist/html`.
- A default `critical` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [critical](https://www.npmjs.com/package/critical)
