PHP HTML Connect BrowserSync Ingredient
================================================================================

A PHP & HTML BrowserSync, and Watch Task. (can use both HTML and PHP pages in a site/app)

- Watches all `PHP` and `HTML` files in `src` and Builds on change. 
- Synchronizes the Browser to `dist`, and updates on any change.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest, series, parallel, watch } = gulp;
import { default as pump } from 'pump-promise';

import browsersync from 'browser-sync';
import connect from 'gulp-connect-php';

const sync = browsersync.create();

export function syncPhp() {
  connect.server({
    base: 'dist'
  },
    () => browsersync({
      proxy = '127.0.0.1:8000'
    })
  );
}

export function browserSyncReload(done) {
    browsersync.reload();
    done();
}

export function buildPhp() {
  return pump(
    src('src/php/**/*.php'),
    dest('dist'),
    sync.stream()
  );

}

export function buildHtml() {
  return pump(
    src('src/html/**/*.html'),
    dest('dist'),
    sync.stream()
  );
}

export function watchFiles()  {
  watch('src/html/**/*.html', buildHtml);
  watch('src/php/**/*.php', buildPhp);
  watch('dist', browserSyncReload);
}

export const all = series(buildHtml, buildPhp, parallel(syncPhp, watchFiles));

export default all;

```

Installation
--------------------------------------------------------------------------------

Requires PHP (Tested with 7.4.3-4ubuntu2.17 and previously with PHP 7.2.24).

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise browser-sync gulp-connect-php`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `src/html`.
- Additional Configuration for PHP sources in `src/php`.

- A `buildHtml` Task.
- A `buildPhp` Task.
- A `syncPhp` Task.
- A `watchFiles` Task.

- A default `all` Task that uses `buildHTML`, `buildPHP`, `syncPhp` and `watchFiles`,   

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [gulp-connect-php](https://www.npmjs.com/package/gulp-connect-php)
