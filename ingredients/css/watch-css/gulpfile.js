import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest, series, watch } = gulp;
import { default as pump } from 'pump-promise';
import rename from 'gulp-rename';

import stylelint from '@ronilaukkarinen/gulp-stylelint';
import { default as cleancss } from 'gulp-clean-css';
import { default as autoprefixer } from 'gulp-autoprefixer';

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
config.plugins.stylelint = {};
config.plugins.stylelint.reporters = [
  {formatter: 'verbose', console: true}
];
config.plugins.autoprefixer = {};
config.plugins.cleancss = {};
config.plugins.cleancss.compatibility = 'ie8';
config.plugins.rename = {suffix: '.min'};

export const css = series(lintCss, buildCss);

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
    dest(config.dist.css, {sourcemaps: true})
  );
}


export function watchFiles() {
  watch(config.src.css, css);
}

export const all = series(css, watchFiles);

export default all;
