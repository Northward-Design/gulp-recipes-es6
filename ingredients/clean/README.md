Clean Ingredient
================================================================================

A Clean Task.

- Removes `dist`.

Usage
--------------------------------------------------------------------------------

```javascript
import { deleteAsync as del } from 'del';

export default function clean() {
  return del('dist');
}
```

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp del`

Add this line to your `package.json` after the opening bracket.

`"type": "module",`

Includes
--------------------------------------------------------------------------------

- Additional Configuration for the location of `dist`.
- A default `clean` Task.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [del](https://www.npmjs.com/package/del)
