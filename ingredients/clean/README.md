Clean Ingredient
================================================================================

A Clean Task.

- Removes `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { default as del } from 'del';

export default function clean() {
  return del('dist');
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env del`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for the location of `dist`.
- A default `clean` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [del](https://www.npmjs.com/package/del)
