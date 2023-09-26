import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import { default as cleancss } from 'gulp-clean-css';
import gzip from 'gulp-gzip';

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
config.src.css = resolve(config.src.root, 'css/**/*.css');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.css = resolve(config.dist.root, 'styles');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.cleancss = {};
config.plugins.cleancss.compatibility = 'ie8';
config.plugins.gzip = {};
config.plugins.gzip.append = true; 
config.plugins.gzip.skipGrowingFiles = true;
config.plugins.gzip.deleteMode = config.dist.css;
config.plugins.gzip.gzipOptions = {};
config.plugins.gzip.gzipOptions.level = 9;
config.plugins.gzip.gzipOptions.memLevel = 9;

export default function buildCss() {
  return pump(
    src(config.src.css),
    cleancss(config.plugins.cleancss),
    dest(config.dist.css),
    gzip(config.plugins.gzip),
    dest(config.dist.css)
  );
}
