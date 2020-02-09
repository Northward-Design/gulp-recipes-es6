import { resolve } from 'path';

import { src, dest, series, watch as watchfiles } from 'gulp';
import { default as pump } from 'pump-promise';

import { default as imgmin } from 'gulp-imagemin';
import { default as changed } from 'gulp-changed';

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
config.src.img = resolve(config.src.root, 'images/**/*.{png,gif,jpg,jpeg,svg}');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.img = resolve(config.dist.root, 'images');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.imgmin = [
  imgmin.gifsicle({optimizationLevel: 3, progressive: true}),
  imgmin.jpegtran({quality: 75, progressive: true}),
  imgmin.optipng({optimizationLevel: 5}),
  imgmin.svgo({
    plugins:[{removeViewBox: true}]
  })
];
config.plugins.imgmin.verbose = {verbose: true} ;

export function optimizeImg() {
  return pump(
    src(config.src.img),
    changed(config.dist.img),
    imgmin(config.plugins.imgmin, config.plugins.imgmin.verbose),
    dest(config.dist.img)
  );
}

export function watch() {
    watchfiles(config.src.img, optimizeImg);
}

export const all = series(optimizeImg, watch);

export default all;