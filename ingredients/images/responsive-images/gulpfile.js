import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import { default as responsive } from 'gulp-responsive';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
config.files.node_modules = resolve(config.root, 'node_modules');

config.src = {};
config.src.root = resolve(config.root, 'src');
config.src.img = resolve(config.src.root, 'images/**/*.{png,jpg,jpeg}');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.img = resolve(config.dist.root, 'images');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.srcset = {};
config.plugins.srcset.mini = '50';
config.plugins.srcset.sm = '800';
config.plugins.srcset.md = '1200';
config.plugins.srcset.lg = '1600'; //Source jpg or jpeg Image MUST be >= twice this width
config.plugins.resp = {};
config.plugins.resp.jpgSet = [
  { 
    width: config.plugins.srcset.mini,
    rename: {suffix: `-${config.plugins.srcset.mini}w`, extname: '.jpg'}
  },{ 
    width: config.plugins.srcset.sm,
    rename: {suffix: `-${config.plugins.srcset.sm}w`, extname: '.jpg'}
  }, { 
    width: config.plugins.srcset.sm * 2,
    rename: {suffix: `-${config.plugins.srcset.sm}w@x2`, extname: '.jpg'}
  }, {
    width: config.plugins.srcset.md,
    rename: {suffix: `-${config.plugins.srcset.md}w`, extname: '.jpg'}
  }, { 
    width: config.plugins.srcset.md * 2,
    rename: {suffix: `-${config.plugins.srcset.md}w@x2`, extname: '.jpg'}
  }, {
    width: config.plugins.srcset.lg,
    rename: {suffix: `-${config.plugins.srcset.lg}w`, extname: '.jpg'}
  }, { 
    width: config.plugins.srcset.lg * 2,
    rename: {suffix: `-${config.plugins.srcset.lg}w@x2`, extname: '.jpg'}
  }, { 
    width: config.plugins.srcset.sm,
    rename: {suffix: `-${config.plugins.srcset.sm}w`, extname: '.webp'}
  }, { 
    width: config.plugins.srcset.sm * 2,
    rename: {suffix: `-${config.plugins.srcset.sm}w@x2`, extname: '.webp'}
  }, {
    width: config.plugins.srcset.md,
    rename: {suffix: `-${config.plugins.srcset.md}w`, extname: '.webp'}
  }, { 
    width: config.plugins.srcset.md * 2,
    rename: {suffix: `-${config.plugins.srcset.md}w@x2`, extname: '.webp'}
  }, {
    width: config.plugins.srcset.lg,
    rename: {suffix: `-${config.plugins.srcset.lg}w`, extname: '.webp'}
  }, { 
    width: config.plugins.srcset.lg * 2,
    rename: {suffix: `-${config.plugins.srcset.lg}w@x2`, extname: '.webp'}
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
  progressive: true,
  quality: 60,
  compressionLevel: 9,
  errorOnUnusedConfig: false,
  errorOnUnusedImage: false,
  errorOnEnlargement: false
};

export default function responsiveImg() {
  return pump(
    src(config.src.img),
    responsive(config.plugins.resp.settings, config.plugins.resp.options),
    dest(config.dist.img)
  );
}
