PHP BrowserSync Ingredient
================================================================================

A PHP BrowserSync, and Watch Task.

- Synchronizes the Browser to `dist/index.php`, and updates on any change.
- Watches all `PHP` files in `dist`. 

Usage
--------------------------------------------------------------------------------

```javascript
import { watch } from 'gulp';

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
  watch('**/*.php').on('change', 
    () => browsersync.reload()
  );
}
```

Installation
--------------------------------------------------------------------------------

Requires PHP (Tested with PHP 7.2.24).

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env browser-sync gulp-connect-php`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for PHP sources in `dist`.
- A default `syncPhp` Task. 

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [gulp-connect-php](https://www.npmjs.com/package/gulp-connect-php)
