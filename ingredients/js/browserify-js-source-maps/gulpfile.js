import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { dest } = gulp;
import { default as pump } from 'pump-promise';
import { default as sourcemaps } from 'gulp-sourcemaps';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';

import { default as browserify } from 'browserify';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
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
config.plugins.source = 'index.js';
config.plugins.sourcemaps = {};
config.plugins.sourcemaps.loadMaps = true;


export default function buildJs() {
  return pump(
    browserify(config.plugins.browserify).bundle(),
    source(config.plugins.source),
    buffer(),
    sourcemaps.init(config.plugins.sourcemaps),
    dest(config.dist.js, {sourcemaps: true})
  )
}
