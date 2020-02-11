import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import { default as responsive } from 'gulp-responsive';

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
config.src.img = resolve(config.src.root, 'images/**/*.{png,jpg,jpeg,tiff,webP}');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.img = resolve(config.dist.root, 'images');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.resp = {};
config.plugins.resp.jpgSet = [
  { 
    width: 150,
    rename: {suffix: '-150w'}
  }, {
    width: 300,
    rename: {suffix: '-300w'}
  }
];
config.plugins.resp.pngSet = {
  width: 600,
  rename: {suffix: '-600w'}
};
config.plugins.resp.settings = {
  '*.{jpg,jpeg}': config.plugins.resp.jpgSet, 
  '*.png': config.plugins.resp.pngSet
};
config.plugins.resp.options = {
  quality: 100,
  compressionLevel: 1,
  errorOnUnusedConfig: false,
  errorOnUnusedImage: false
};

export default function responsiveImg() {
  return pump(
    src(config.src.img),
    responsive(config.plugins.resp.settings, config.plugins.resp.options),
    dest(config.dist.img)
  );
}
