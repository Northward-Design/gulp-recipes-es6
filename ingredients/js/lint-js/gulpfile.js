import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src } = gulp;
import { default as pump } from 'pump-promise';

import { default as eslint } from 'gulp-eslint';

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
config.src.js = resolve(config.src.root, 'js/**/*.js');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.js = resolve(config.dist.root, 'scripts');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.eslint = {};

export default function lintJs() {
  return pump(
    src(config.src.js),
    eslint(config.plugins.eslint),
    eslint.formatEach(),
    eslint.failAfterError()
  );
}
