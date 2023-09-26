Critical CSS Ingredient
================================================================================

A Critical CSS Task

- Compares selectors in all `.html` files from `src/html` with `dist/styles/index.css`.
- Copies critical-path (above the fold) CSS and In-lines it into the `.html` files.
- Generates a script in all `.html` files to asynchronously load external `.css` file.
- Outputs all `.html` files to `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import {generate} from 'critical';

export default function crit() {
  return pump(
    src('src/html/**/*.html'),
    generate.stream({
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

`npm install --save-dev gulp pump-promise critical`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for CSS sources in `dist/styles`.
- A default `crit` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [critical](https://www.npmjs.com/package/critical)
