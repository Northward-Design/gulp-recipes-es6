Sitemap Generation Ingredient
================================================================================

A Sitemap Creation Task.

- Creates a `sitemap.xml` file in the `dist` folder based on the `.html` files in `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { src, dest } from 'gulp';
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

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env pump-promise gulp-sitemap`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for HTML sources in `dist`.
- A default `buildSitemap` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp/)
- [@babel/core](https://www.npmjs.com/package/@babel/core/)
- [@babel/register](https://www.npmjs.com/package/@babel/register/)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env/)
- [pump-promise](https://www.npmjs.com/package/pump-promise)
- [gulp-sitemap](https://www.npmjs.com/package/gulp-sitemap)
