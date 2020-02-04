import { resolve } from 'path';

import { src } from 'gulp';
import { default as pump } from 'pump-promise';

import stylelint from 'gulp-stylelint';

const config = {};

config.root = resolve(__dirname);

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
config.files.babelrc = resolve(config.root, '.babelrc');
config.files.browserslistrc = resolve(config.root, '.browserslistrc');
config.files.node_modules = resolve(config.root, 'node_modules');

config.src = {};
config.src.root = resolve(config.root, 'src');
config.src.css = resolve(config.src.root, 'css/**/*.css');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};

config.plugins.stylelint = {};
config.plugins.stylelint.reporters = [
  {formatter: 'verbose', console: true}
];

export default function lintCss() {
  return pump(
    src(config.src.css),
    stylelint(config.plugins.stylelint)
   );
}
