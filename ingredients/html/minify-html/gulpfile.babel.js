import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import htmlmin from 'gulp-htmlmin';

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
config.dist.html = config.dist.root;

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.htmlmin = {};
config.plugins.htmlmin.collapseWhitespace = true;
config.plugins.htmlmin.removeComments = true;

export default function buildHtml() {
  return pump(
    src(config.src.html),
    htmlmin(config.plugins.htmlmin),
    dest(config.dist.html)
  );
}
