import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest, series, watch } = gulp;
import pump from 'pump-promise';

import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);
import stylelint from '@ronilaukkarinen/gulp-stylelint';

import { default as autoprefixer } from 'gulp-autoprefixer';
import rename from 'gulp-rename';

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
config.src.sass = resolve(config.src.root, 'sass/**/*.scss');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.sass = resolve(config.dist.root, 'styles');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.stylelint = {};
config.plugins.stylelint.customSyntax = 'postcss-scss';
config.plugins.stylelint.reporters = [
  {formatter: 'string', console: true}
];
config.plugins.sass = {};
config.plugins.sass.errorLogToConsole = true;
config.plugins.sass.outputStyle = 'compressed';
config.plugins.autoprefixer = {};
config.plugins.rename = {suffix: '.min'};

export const sassy = series(lintSass, buildSass);

export function lintSass() {
  return pump(
    src(config.src.sass),
    stylelint(config.plugins.stylelint)
  );
}

export function buildSass() {
  return pump(
    src(config.src.sass, {sourcemaps: true}),
    sass(config.plugins.sass),
    autoprefixer(config.plugins.autoprefixer),
    rename(config.plugins.rename),
    dest(config.dist.sass, {sourcemaps: true})
  );
}


export function watchFiles() {
  watch(config.src.sass, sassy);
}

export const all = series(sassy, watchFiles);

export default all;
