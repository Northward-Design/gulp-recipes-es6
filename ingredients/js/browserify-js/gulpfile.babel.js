import { resolve } from 'path';

import { series, src, dest } from 'gulp';
import { default as pump } from 'pump-promise';
import { default as source } from 'vinyl-source-stream';

import { default as browserify } from 'browserify';

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
config.src.js = resolve(config.src.root, 'js/index.js');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.js = resolve(config.dist.root, 'scripts');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.browserify = {};
config.plugins.browserify.entries = [config.src.js];

export default function buildJs() {
  return pump(
    browserify(config.plugins.browserify).bundle(),
    source('index.js'),
    dest(config.dist.js)
  )
}
