import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import base64 from 'gulp-base64-inline';

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
config.src.images = resolve(config.src.root, 'images');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root;

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.base64 = {
  prefix: "",
  suffix: ""
};

export default function inlineImg() {
  return pump(
    src(config.src.html),
    base64(config.src.images, config.plugins.base64),
    dest(config.dist.html)
  );
}
