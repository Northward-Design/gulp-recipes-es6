import { resolve } from 'path';

import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';
import { default as sourcemaps } from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';

import { default as tslint } from 'gulp-tslint';
import { default as browserify } from 'browserify';
import { default as tsify } from 'tsify';
import uglify from 'gulp-uglify';
import browsersync from 'browser-sync';

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
config.src.tsEntry = resolve(config.src.root, 'ts/index.ts');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.ts = resolve(config.dist.root, 'scripts');

config.clean = {};
config.clean.dist = config.dist.root;
config.clean.ts = resolve(config.clean.dist, 'scripts');

config.plugins = {};
config.plugins.tslint = {};
config.plugins.tslint.formatter = 'verbose';
config.plugins.browserify = {};
config.plugins.browserify.entries = [config.src.tsEntry];
config.plugins.browsersync = {};
config.plugins.source = 'index.js';
config.plugins.uglify = {};
config.plugins.rename = {suffix: '.min'};
config.plugins.sourcemaps = {};
config.plugins.sourcemaps.loadMaps = true;
config.plugins.browsersync.server = {};
config.plugins.browsersync.server.baseDir = config.dist.root;

const sync = browsersync.create();
const refresh = browsersync.reload();

export const ts = series(lintTs, buildTs);

export function lintTs() {
  return pump(
    src(config.src.ts),
    tslint(config.plugins.tslint),
    tslint.report()
  );
}

export function buildTs() {
  return pump(
    browserify(config.plugins.browserify)
    .plugin(tsify)
    .bundle(),
    source(config.plugins.source),
    buffer(),
    uglify(config.plugins.uglify),
    rename(config.plugins.rename),
    sourcemaps.init(config.plugins.sourcemaps),
    dest(config.dist.ts, {sourcemaps: true}),
    sync.stream()
  )
}

export function serve(done) {
  sync.init(config.plugins.browsersync);
  done();
}

export function watch(){
  watchfiles(config.src.ts, ts);
  watchfiles(config.dist.ts, refresh);
}

export const all = series(ts, serve, watch);

export default all;
