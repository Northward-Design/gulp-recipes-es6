import { resolve } from 'path';

import { src } from 'gulp';
import { default as pump } from 'pump-promise';

import linthtml from 'gulp-htmllint';

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
config.src.html = resolve(config.src.root, 'html/**/*.html');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};

config.plugins.htmllint = {};

export default function lintHtml() {
  return pump(
    src(config.src.html),
    linthtml(config.plugins.htmllint)
  );
}
