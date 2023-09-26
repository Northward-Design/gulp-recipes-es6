PHP BrowserSync Ingredient
================================================================================

A PHP BrowserSync, and Watch Task.

- Synchronizes the Browser to `dist/index.php`, and updates on any change.
- Watches all `PHP` files in `dist`. 

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { watch } = gulp;

import browsersync from 'browser-sync';
import connect from 'gulp-connect-php';

export default function syncPhp() {
  connect.server({
  	base: 'dist'
  },
    () => browsersync({
    	proxy = '127.0.0.1:8000'
    })
  );
  watch('dist/**/*.php').on('change',
    () => browsersync.reload()
  );
}
```

Installation
--------------------------------------------------------------------------------

Requires PHP (Tested with 7.4.3-4ubuntu2.17 and previously with PHP 7.2.24).

Install the required plugins with `npm`.

`npm install --save-dev gulp browser-sync gulp-connect-php`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for PHP sources in `dist`.
- A default `syncPhp` Task. 

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [gulp-connect-php](https://www.npmjs.com/package/gulp-connect-php)
