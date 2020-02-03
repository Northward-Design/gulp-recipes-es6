Base
================================================================================

A basic `gulpfile` ingredient.

Usage
--------------------------------------------------------------------------------

Copy the base `gulpfile.babel.js` and install the required dependencies

Installation
--------------------------------------------------------------------------------

Install the required plugins with `npm`.

`npm install --save-dev gulp @babel/core @babel/register @babel/preset-env`

Includes
--------------------------------------------------------------------------------

- A basic `gulpfile.babel.js`.
- A basic configuration.
- An empty default task.
- A `.babelrc` file so `babel` can parse `gulpfulp.babel.js`.
- A `.browserlistrc` for `@babel/preset-env` to load its environment from.

Dependencies
--------------------------------------------------------------------------------

- [gulp](https://www.npmjs.com/package/gulp)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/register](https://www.npmjs.com/package/@babel/register)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
