import { resolve } from 'path';

import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';
import stylelint from 'gulp-stylelint';
import { default as cleancss } from 'gulp-clean-css';
import { default as eslint } from 'gulp-eslint';
import { default as browserify } from 'browserify';
import babel from 'babelify';
import uglify from 'gulp-uglify';
import { default as imgmin } from 'gulp-imagemin';

import { default as autoprefixer } from 'gulp-autoprefixer';
import { default as source } from 'vinyl-source-stream';
import { default as buffer } from 'vinyl-buffer';
import { default as sourcemaps } from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import { default as changed } from 'gulp-changed';
import browsersync from 'browser-sync';
import { default as del } from 'del';

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
config.src.css = resolve(config.src.root, 'css/**/*.css');
config.src.js = resolve(config.src.root, 'js/**/*.js');
config.src.jsEntry = resolve(config.src.root, 'js/index.js');
config.src.img = resolve(config.src.root, 'images/**/*.{png,gif,jpg,jpeg,svg}');
config.src.negateOptimized = '!src/images/optimized/**/*';
config.src.optimized = resolve(config.src.root, 'images/optimized/**/*.{png,gif,jpg,jpeg,svg}');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root;
config.dist.dir = config.dist.root;
config.dist.watch = config.dist.root;
config.dist.css = resolve(config.dist.root, 'styles');
config.dist.js = resolve(config.dist.root, 'scripts');
config.dist.img = resolve(config.dist.root, 'images');

config.clean = {};
config.clean.dist = config.dist.root;
config.clean.html = resolve(config.clean.dist, '*.html');
config.clean.css = resolve(config.clean.dist, 'styles');
config.clean.js = resolve(config.clean.dist, 'scripts');

config.plugins = {};
config.plugins.rename = {suffix: '.min'};
config.plugins.htmllint = {};
config.plugins.htmllint.failOnError = true;
config.plugins.htmlmin = {};
config.plugins.htmlmin.collapseWhitespace = true;
config.plugins.htmlmin.removeComments = true;
config.plugins.stylelint = {};
config.plugins.stylelint.reporters = [
  {formatter: 'verbose', console: true}
];
config.plugins.autoprefixer = {};
config.plugins.cleancss = {};
config.plugins.cleancss.compatibility = 'ie8';
config.plugins.eslint = {};
config.plugins.babel = {};
config.plugins.browserify = {};
config.plugins.browserify.entries = [config.src.jsEntry];
config.plugins.source = 'index.js';
config.plugins.uglify = {};
config.plugins.sourcemaps = {};
config.plugins.sourcemaps.loadMaps = true;
config.plugins.browsersync = {};
config.plugins.browsersync.server = {};
config.plugins.browsersync.server.baseDir = config.dist.dir;
config.plugins.imgmin = [
  imgmin.gifsicle({optimizationLevel: 3, progressive: true}),
  imgmin.mozjpeg({quality: 75, progressive: true}),
  imgmin.optipng({optimizationLevel: 5}),
  imgmin.svgo({
    plugins:[{removeViewBox: true}]
  })
];
config.plugins.imgmin.verbose = {verbose: true} ;

const sync = browsersync.create();
const refresh = browsersync.reload();

export function serve(done) {
  sync.init(config.plugins.browsersync);
  done();
}

export const html = series(cleanHtml, lintHtml, buildHtml);

export function lintHtml() {
  return pump(
    src(config.src.html),
    htmllint(config.plugins.htmllint)
  );
}

export function buildHtml() {
  return pump(
    src(config.src.html),
    htmlmin(config.plugins.htmlmin),
    dest(config.dist.html),
    sync.stream()
  );
}

export const css = series(cleanCss, lintCss, buildCss);

export function lintCss() {
  return pump(
    src(config.src.css),
    stylelint(config.plugins.stylelint)
  );
}

export function buildCss() {
  return pump(
    src(config.src.css, {sourcemaps: true}),
    autoprefixer(config.plugins.autoprefixer),
    cleancss(config.plugins.cleancss),
    rename(config.plugins.rename),
    dest(config.dist.css, {sourcemaps: true}),
    sync.stream()
  );
}

export const js = series(cleanJs, lintJs, buildJs);

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

export function optimizeImg() {
  return pump(
    src([config.src.img, config.src.negateOptimized]),
    changed(config.dist.img),
    imgmin(config.plugins.imgmin, config.plugins.imgmin.verbose),
    src(config.src.optimized),
    changed(config.dist.img),
    dest(config.dist.img),
    sync.stream()
  );
}

export function watch()  {
  watchfiles(config.src.html, html);
  watchfiles(config.src.css, css);
  watchfiles(config.src.js, js);
  watchfiles(config.src.img, optimizeImg);
  watchfiles(config.dist.watch, refresh);
}

export function clean() {
  return del(config.clean.dist);
}

export function cleanHtml() {
  return del(config.clean.html);
}

export function cleanCss() {
  return del(config.clean.css);
}

export function cleanJs() {
  return del(config.clean.js);
}

export const lint = series(lintHtml, lintCss, lintJs);

export const build = series(clean, buildHtml, buildCss, buildJs, optimizeImg);

export const all = series(lint, build, serve, watch);

export default all;
