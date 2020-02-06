import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import { default as typescript } from 'gulp-typescript';
import uglify from 'gulp-uglify';

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
config.src.ts = resolve(config.src.root, 'ts/**/*.ts');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.js = resolve(config.dist.root, 'scripts');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.ts = {};
config.plugins.uglify = {};
config.plugins.rename = {suffix: '.min'};

export default function buildTs() {
  return pump(
    src(config.src.ts),
    typescript(config.plugins.ts),
    uglify(config.plugins.uglify),
    rename(config.plugins.rename),
    dest(config.dist.js)
  );
}
