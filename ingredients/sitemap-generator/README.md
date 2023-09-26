Sitemap Generation Ingredient
================================================================================

A Sitemap Creation Task.

- Creates a `sitemap.xml` file in the `dist` folder based on the `.html` files in `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import sitemap from 'gulp-sitemap';

export default function buildSitemap() {
  return pump(
    src('dist/*.html', { read: false }),
    sitemap({siteUrl: 'http://www.example-site.com'}),
    dest('dist')
  );
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp pump-promise gulp-sitemap`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `dist`.
- A default `buildSitemap` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-sitemap](https://www.npmjs.com/package/gulp-sitemap)
