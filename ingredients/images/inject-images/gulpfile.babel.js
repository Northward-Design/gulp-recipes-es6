import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

import strings from './htmlstrings.js';

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
config.src.img = resolve(config.src.root, 'images/**/*.{jpg,jpeg}');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root;

config.clean = {};
config.clean.dist = config.dist.root;

// Choose Image Sizes (px) And Alt Tags
const mini = '10';
const sm = '800';
const md = '1200';
const lg = '1600';
const alt = [
  'Alt Tag For First Image',
  'Alt Tag For Second Image',
  'add another string for each Image'
]

// Choose ONE String to use (0 - 5) from array below
const selectString = 5;

// Strings from .htmlstrings.js
const stringSet = [
strings.smSrcset,   // 0
strings.mdSrcset,   // 1
strings.lgSrcset,   // 2
strings.smLazy,     // 3
strings.autoLazy,   // 4
strings.lgLazy      // 5
]

let imgcount = 0;
let altcount = -1;

config.plugins = {};
config.plugins.inject = {};
config.plugins.inject.ignorePath = '../';
config.plugins.inject.relative = true;
config.plugins.inject.removeTags = true;

config.plugins.inject.starttag = () => {
  imgcount++;
  return `<!-- inject:img${imgcount} -->`;
};

config.plugins.inject.transform = (filepath) => {
  altcount++;
  let pathName = filepath.substring(0, filepath.lastIndexOf('.'));
  let name = pathName.substring(pathName.lastIndexOf('/')+1);
  return stringSet[selectString](pathName, name, mini, sm, md, lg, alt[altcount]);
};

export default function injection() {
  return pump(
    src(config.src.html),
    inject(src([config.src.img]), config.plugins.inject),
    dest(config.dist.html)
  );
}
