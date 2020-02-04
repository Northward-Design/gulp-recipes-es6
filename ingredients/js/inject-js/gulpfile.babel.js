import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

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
config.dist.js = resolve(config.dist.root, 'scripts');
config.dist.jsEntry = resolve(config.dist.js, 'index.js');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.inject = {};
config.plugins.inject.removeTags = true;
config.plugins.inject.transform = function(filePath, file) {
  return file.contents.toString();
};

export default function injection() {
  return pump(
    src(config.src.html),
    inject(src([config.dist.jsEntry]), config.plugins.inject),
    dest(config.dist.html)
  );
}
