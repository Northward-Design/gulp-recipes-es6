import { resolve } from 'path';

import { src, dest, series, parallel, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import stylelint from 'gulp-stylelint';
import { default as tslint } from 'gulp-tslint';
import { default as browserify } from 'browserify';
import tsify from 'tsify';
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

import gulpif from 'gulp-if';
import crit from 'critical';
import purge from 'gulp-purgecss';
import inject from 'gulp-inject';
import postcss from 'gulp-postcss';
import assets from 'postcss-assets';
import gzip from 'gulp-gzip';
import sitemap from 'gulp-sitemap';
import concat from 'gulp-concat';
import { default as responsive } from 'gulp-responsive';
import base64 from 'gulp-base64-inline';
import cache from 'gulp-cached';

import strimg from './string-img-sets.js';

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
config.src.sass = resolve(config.src.root, 'sass/**/*.scss');
config.src.ts = resolve(config.src.root, 'ts/**/*.ts');
config.src.negatePlugins = '!src/ts/plugins/**/*.js';
config.src.jsPlugins = resolve(config.src.root, 'ts/plugins/**/*.js');
config.src.tsEntry = resolve(config.src.root, 'ts/index.ts');
config.src.img = resolve(config.src.root, 'images/**/*.{jpg,jpeg}');
config.src.negateOptimize = '!src/images/optimize/**/*';
config.src.negatePreOp = '!src/images/pre-op/**/*';
config.src.optimize = resolve(config.src.root, 'images/optimize/**/*.{png,gif,jpg,jpeg,svg}');
config.src.preOp = resolve(config.src.root, 'images/pre-op/**/*.{png,gif,jpg,jpeg,svg}');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root;
config.dist.htmlSrc = resolve(config.dist.root, '*.html');
config.dist.dir = config.dist.root;
config.dist.sass = resolve(config.dist.root, 'styles');
config.dist.ts = resolve(config.dist.root, 'scripts');
config.dist.jsEntry = resolve(config.dist.ts, 'index.min.js');
config.dist.img = resolve(config.dist.root, 'images');

config.clean = {};
config.clean.dist = config.dist.root;
config.clean.html = resolve(config.clean.dist, '*.html');
config.clean.sass = resolve(config.clean.dist, 'styles');
config.clean.ts = resolve(config.clean.dist, 'scripts');

config.plugins = {};
config.plugins.htmllint = {};
config.plugins.htmllint.failOnError = true;
config.plugins.htmlmin = {};
config.plugins.htmlmin.collapseWhitespace = true;
config.plugins.htmlmin.removeComments = true;
config.plugins.htmlmin.minifyJS = true;
config.plugins.htmlmin.customAttrCollapse = /srcset|sizes|data-srcset|data-sizes/;
config.plugins.stylelint = {};
config.plugins.stylelint.reporters = [
  {formatter: 'verbose', console: true}
];
config.plugins.sass = {};
config.plugins.sass.errorLogToConsole = true;
config.plugins.sass.outputStyle = 'compressed';
config.plugins.autoprefixer = {};
config.plugins.rename = {suffix: '.min'};
config.plugins.tslint = {};
config.plugins.tslint.formatter = 'verbose';
config.plugins.browserify = {};
config.plugins.browserify.entries = [config.src.tsEntry];
config.plugins.source = 'index.js';
config.plugins.concat = 'index.js';
config.plugins.uglify = {};
config.plugins.sourcemaps = {};
config.plugins.sourcemaps.loadMaps = true;
config.plugins.browsersync = {};
config.plugins.browsersync.server = {};
config.plugins.browsersync.server.baseDir = config.dist.dir;

const sync = browsersync.create();
const refresh = browsersync.reload();

config.plugins.imgmin = [
  imgmin.gifsicle({optimizationLevel: 3, progressive: true}),
  imgmin.mozjpeg({quality: 75, progressive: true}),
  imgmin.optipng({optimizationLevel: 5}),
  imgmin.svgo({
    plugins:[{removeViewBox: true}]
  })
];
config.plugins.imgmin.verbose = {verbose: true} ;
config.plugins.critical = {};
config.plugins.critical.css = [config.dist.sass + '/index.min.css'];
config.plugins.critical.inline = true;
config.plugins.critical.ignore = {atrule: ['@font-face']};
config.plugins.critical.dimensions = [{height: 1440, width: 2560}];
config.plugins.purgecss = {};
config.plugins.purgecss.content = [config.src.html];
config.plugins.purgecss.whitelist = ['initial', 'loaded', 'error'];
config.plugins.injectJs = {};
config.plugins.injectJs.removeTags = true;
config.plugins.injectJs.ignorePath = 'dist';
config.plugins.injectJs.addRootSlash = false;
config.plugins.injectJsProd = {};
config.plugins.injectJsProd.removeTags = true;
config.plugins.injectJsProd.transform = (filePath, file) => {
  return '<script>'+file.contents.toString()+'</script>';
};
config.plugins.postcss = {};
config.plugins.assets = {};
config.plugins.assets.loadPaths = [config.dist.img];
config.plugins.assets.relative = config.dist.sass;
config.plugins.gzip = {};
config.plugins.gzip.append = true; 
config.plugins.gzip.skipGrowingFiles = true;
config.plugins.gzip.gzipOptions = {};
config.plugins.gzip.gzipOptions.level = 9;
config.plugins.gzip.gzipOptions.memLevel = 9;
config.plugins.sitemap = {};
config.plugins.sitemap.siteUrl = 'http://www.example-site.com';
config.plugins.base64 = {
  prefix: "",
  suffix: ""
};
config.plugins.cache = {}
config.plugins.cache.optimizeMemory = true;

// INJECT RESPONSIVE IMAGE SETTINGS
// Choose ONE String and Image Set to use (0 - 5)
// 0 = simple SRCSET string and Images
// 1 = wide SRCSET 
// 2 = product SRCSET
// 3 = simple Lazy Load SRCSET
// 4 = auto/wide Lazy Load SRCSET
// 5 = product Lazy Load SRCSET 
const selector = 3;

// Make the Mini Image for Lazy Load a Base64 Data URL
const dataUrl = true;

// Choose Image Sizes (px)
const mini = '10'; // Lazy Load Teaser Image
const xs = '640';
const sm = '768';
const md = '1024';
const lg = '1366';
const xl = '1600';

// Choose min-width Break points (px)
const xsBrkpt = '576';
const smBrkpt = '768';
const mdBrkpt = '992';
const lgBrkpt = '1200';
const xlBrkpt = '1600';

// Choose Image Widths for breakpoints (can use any unit, vw is best practice)
const xsScrn = '100vw';
const smScrn = '75vw';
const mdScrn = '50vw';
const lgScrn = '33vw';
const xlScrn = '25vw';
const xxlScrn = '16.5vw';

// Choose Alt Tags In order that images will be selected (A-Z then a-z)
const alt = [ 
  'Alt Tag For First Image',
  'Alt Tag For Second Image',
  'add another string for each Image'
]

config.clean.miniImg = resolve(config.clean.dist, `images/*-${mini}w.jpg`);

config.plugins.resp = {};
config.plugins.resp.options = {
  progressive: true,
  quality: 60,
  errorOnUnusedConfig: false,
  errorOnUnusedImage: false,
  errorOnEnlargement: false
};

// Responsive Function
config.plugins.resp.settings = () => {
  return strimg.imgSet[selector](mini, xs, sm, md, lg, xl);
}

let imgcount;
let altcount;
config.plugins.inject = {};
config.plugins.inject.ignorePath = '../';
config.plugins.inject.relative = true;
config.plugins.inject.removeTags = true;

// Inject Functions
config.plugins.inject.starttag = () => {
  imgcount++;
  return `<!-- inject:img${imgcount} -->`;
};

config.plugins.inject.transform = (filepath) => {
  altcount++;
  let pathName = filepath.substring(0, filepath.lastIndexOf('.'));
  let name = pathName.substring(pathName.lastIndexOf('/')+1);
  return strimg.stringSet[selector](dataUrl, pathName, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt[altcount]);
};

//Gulp Tasks
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
  imgcount = 0;
  altcount = -1;
  config.plugins.gzip.deleteMode = config.dist.html;
  return pump(
    src(config.src.html),
    inject(src([config.src.img, config.src.negateOptimize, config.src.negatePreOp]), config.plugins.inject),
    inject(src([config.dist.jsEntry]), 
    gulpif(config.env.development, config.plugins.injectJs, config.plugins.injectJsProd)),
    base64(config.dist.dir, config.plugins.base64),
    gulpif(!config.env.development, crit.stream(config.plugins.critical)),
    gulpif(!config.env.development, htmlmin(config.plugins.htmlmin)),
    dest(config.dist.html),
    gulpif(!config.env.development, gzip(config.plugins.gzip)),
    gulpif(!config.env.development, dest(config.dist.html)),
    sync.stream()
  );
}

export const sassy = series(cleanSass, lintSass, buildSass);

export function lintSass() {
  return pump(
    src(config.src.sass),
    stylelint(config.plugins.stylelint)
  );
}

export function buildSass() {
  config.plugins.gzip.deleteMode = config.dist.sass;
  return pump(
    src(config.src.sass),
    gulpif(config.env.development, sourcemaps.init(config.plugins.sourcemaps)),
    sass(config.plugins.sass),
    autoprefixer(config.plugins.autoprefixer),
    rename(config.plugins.rename),
    gulpif(!config.env.development, purge(config.plugins.purgecss)),
    postcss([assets(config.plugins.assets)]),
    dest(config.dist.sass, gulpif(config.env.development, {sourcemaps: true})),
    gulpif(!config.env.development, gzip(config.plugins.gzip)),
    gulpif(!config.env.development, dest(config.dist.sass)),
    sync.stream()
  );
}

export const ts = series(cleanTs, lintTs, buildTs);

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
    src(config.src.jsPlugins),
    concat(config.plugins.concat),
    uglify(config.plugins.uglify),
    rename(config.plugins.rename),
    gulpif(config.env.development, sourcemaps.init(config.plugins.sourcemaps)),
    dest(config.dist.ts, gulpif(config.env.development, {sourcemaps: true})),
    sync.stream()
  );
}

export const img = series(optimizeImg, responsiveImg);

export function optimizeImg() {
  return pump(
    src(config.src.optimize),
    changed(config.dist.img),
    imgmin(config.plugins.imgmin, config.plugins.imgmin.verbose),
    src(config.src.preOp),
    changed(config.dist.img),
    dest(config.dist.img),
  );
}

export function responsiveImg() {
  return pump(
    src([config.src.img, config.src.negateOptimize, config.src.negatePreOp]),
    cache([config.src.img, config.src.negateOptimize, config.src.negatePreOp], config.plugins.cache),
    responsive(config.plugins.resp.settings(), config.plugins.resp.options),
    dest(config.dist.img)
  );
}

export function buildSitemap() {
  return pump(
    src(config.dist.htmlSrc, {read: false}),
    sitemap(config.plugins.sitemap),
    dest(config.dist.html)
  );
}

export function watch()  {
  watchfiles(config.src.html, html);
  watchfiles(config.src.sass, sassy);
  watchfiles(config.src.ts, ts);
  watchfiles([config.src.img, config.src.optimize, config.src.preOp], series(img, sassy, html));
  watchfiles(config.dist.dir, refresh);
}

export function clean() {
  return del(config.clean.dist);
}

export function cleanHtml() {
  return del(config.clean.html);
}

export function cleanSass() {
  return del(config.clean.sass);
}

export function cleanTs() {
  return del(config.clean.ts);
}

export function cleanMini() {
  return gulpif(dataUrl, del(config.clean.miniImg));
}

export const lint = series(lintHtml, lintSass, lintTs);

export const build = gulpif(config.env.development,
  series(clean, img, buildTs, buildSass, buildHtml),
  series(clean, img, buildTs, buildSass, buildHtml, buildSitemap, cleanTs, cleanMini));

export const all = gulpif(config.env.development,
  series(lint, build, serve, watch), build);

export default all;
