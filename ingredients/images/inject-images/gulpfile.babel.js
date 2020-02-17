import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

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

config.plugins = {};
config.plugins.srcset = {};
config.plugins.srcset.mini = '50';
config.plugins.srcset.sm = '800';
config.plugins.srcset.md = '1200';
config.plugins.srcset.lg = '1600';
config.plugins.srcset.imgcount = 0;
config.plugins.inject = {};
config.plugins.inject.ignorePath = '../';
config.plugins.inject.relative = true;
config.plugins.inject.removeTags = true;
config.plugins.inject.starttag = () => {
  config.plugins.srcset.imgcount++;
  return `<!-- inject:img${config.plugins.srcset.imgcount} -->`;
};
config.plugins.inject.transform = (filepath) => {
  let fileName = filepath.substring(0, filepath.lastIndexOf('.'));
  return `
    <picture>
      <source media="(min-width: ${config.plugins.srcset.lg}px)"
        data-srcset="
          ${fileName}-${config.plugins.srcset.lg}w.webp,
          ${fileName}-${config.plugins.srcset.lg}w@2x.webp 2x"
        type="image/webp">
      <source media="(min-width: ${config.plugins.srcset.md}px)"
        data-srcset="
          ${fileName}-${config.plugins.srcset.md}w.webp, 
          ${fileName}-${config.plugins.srcset.md}w@2x.webp 2x"
        type="image/webp">
      <source
        data-srcset="
          ${fileName}-${config.plugins.srcset.sm}w.webp, 
          ${fileName}-${config.plugins.srcset.sm}w@2x.webp 2x"
        type="image/webp">
      <source media="(min-width: ${config.plugins.srcset.lg}px)"
        data-srcset="
          ${fileName}-${config.plugins.srcset.lg}w.jpg,
          ${fileName}-${config.plugins.srcset.lg}w@2x.jpg 2x">
      <source media="(min-width: ${config.plugins.srcset.md}px)"
        data-srcset="
          ${fileName}-${config.plugins.srcset.md}w.jpg, 
          ${fileName}-${config.plugins.srcset.md}w@2x.jpg 2x">
      <img class="lazy"
        data-srcset="
          ${fileName}-${config.plugins.srcset.sm}w.jpg,
          ${fileName}-${config.plugins.srcset.sm}w@2x.jpg 2x" 
        data-src="${fileName}-${config.plugins.srcset.mini}w.jpg"
      alt="my images">
    </picture>`;
};

export default function injection() {
  return pump(
    src(config.src.html),
    inject(src([config.src.img]), config.plugins.inject),
    dest(config.dist.html)
  );
}
