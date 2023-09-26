import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest, series, watch } = gulp;
import { default as pump } from 'pump-promise';
import { default as sourcemaps } from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';

import { default as eslint } from 'gulp-eslint';
import { default as browserify } from 'browserify';
import babel from 'babelify';
import uglify from 'gulp-uglify';
import browsersync from 'browser-sync';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
config.files.babelrc = resolve(config.root, '.babelrc');
config.files.node_modules = resolve(config.root, 'node_modules');

config.src = {};
config.src.root = resolve(config.root, 'src');
config.src.js = resolve(config.src.root, 'js/**/*.js');
config.src.jsEntry = resolve(config.src.root, 'js/index.js');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.dir = config.dist.root;
config.dist.js = resolve(config.dist.root, 'scripts');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.eslint = {};
config.plugins.babel = {};
config.plugins.browserify = {};
config.plugins.browserify.entries = [config.src.jsEntry];
config.plugins.source = 'index.js';
config.plugins.uglify = {};
config.plugins.rename = {suffix: '.min'};
config.plugins.sourcemaps = {};
config.plugins.sourcemaps.loadMaps = true;
config.plugins.browsersync = {};
config.plugins.browsersync.server = {};
config.plugins.browsersync.server.baseDir = config.dist.dir;

const sync = browsersync.create();
const refresh = browsersync.reload();

export const js = series(lintJs, buildJs);

export function lintJs() {
  return pump(
    src(config.src.js),
    eslint(config.plugins.eslint),
    eslint.formatEach(),
    eslint.failAfterError()
  );
}

export function buildJs() {
  return pump(
    browserify(config.plugins.browserify)
    .transform(babel)
    .bundle(),
    source(config.plugins.source),
    buffer(),
    uglify(config.plugins.uglify),
    rename(config.plugins.rename),
    sourcemaps.init(config.plugins.sourcemaps),
    dest(config.dist.js, {sourcemaps: true}),
    sync.stream()
  );
}

export function serve(done) {
  sync.init(config.plugins.browsersync);
  done();
}

export function watchFiles() {
  watch(config.src.js, js);
  watch(config.dist.js, refresh);
}

export const all = series(js, serve, watchFiles);

export default all;
