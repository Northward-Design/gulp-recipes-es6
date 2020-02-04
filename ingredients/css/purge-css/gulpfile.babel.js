import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import purge from 'gulp-purgecss';

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

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.css = resolve(config.dist.root, 'styles');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.purgecss = {};
config.plugins.purgecss.content = [config.src.html];


export default function thePurge() {
  return pump(
    src(config.src.css),
    purge(config.plugins.purgecss),
    dest(config.dist.css)
  );
}
