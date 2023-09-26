import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
import { default as pump } from 'pump-promise';

import htmllint from 'gulp-htmllint';
import htmlmin from 'gulp-htmlmin';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
config.files.node_modules = resolve(config.root, 'node_modules');

config.src = {};
config.src.root = resolve(config.root, 'src');
config.src.html = resolve(config.src.root, 'html/**/*.html');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root;

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.htmllint = {};
config.plugins.htmllint.failOnError = true;
config.plugins.htmlmin = {};
config.plugins.htmlmin.collapseWhitespace = true;
config.plugins.htmlmin.removeComments = true;

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
    dest(config.dist.html)
  );
}

export const html = series(lintHtml, buildHtml);

export function watchFiles() {
  watch(config.src.html, html);
}

export const all = series(html, watchFiles);

export default all;
