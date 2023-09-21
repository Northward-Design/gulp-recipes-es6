import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
import { default as pump } from 'pump-promise';

import imagemin, {gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import { default as changed } from 'gulp-changed';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
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
config.plugins.imagemin = [
  gifsicle({optimizationLevel: 3, interlaced: true}),
  mozjpeg({quality: 75, progressive: true}),
  optipng({optimizationLevel: 5}),
  svgo({
    plugins:[{name: 'removeViewBox', active: true}]
  })
];
config.plugins.imagemin.verbose = {verbose: true};

export function optimizeImg() {
  return pump(
    src(config.src.img),
    changed(config.dist.img),
    imagemin(config.plugins.imagemin, config.plugins.imagemin.verbose),
    dest(config.dist.img)
  );
}

export function watchFiles() {
    watch(config.src.img, optimizeImg);
}

export const all = series(optimizeImg, watchFiles);

export default all;

// If Images are getting larger due to custom settings, replace function above with this:

// config.src.negateOptimized = '!src/images/optimized/**/*';
// config.src.optimized = resolve(config.src.root, 'images/optimized/**/*');

// export function optimizeImg() {
//   return pump(
//     src([config.src.img, config.src.negateOptimized]),
//     changed(config.dist.img),
//     imagemin(config.plugins.imagemin, config.plugins.imagemin.verbose),
//     src(config.src.optimized),
//     changed(config.dist.img),
//     dest(config.dist.img)
//   );
// }
