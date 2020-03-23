import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import gulpif from 'gulp-if';

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

config.temp = {};
config.temp.root = resolve(config.root, 'temp');
config.temp.html = config.temp.root

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root

config.clean = {};
config.clean.dist = config.dist.root;

export default function query() {
  return pump(
    src(config.src.html),
    dest(gulpif(config.env.development, config.temp.html, config.dist.html))
  );
}
