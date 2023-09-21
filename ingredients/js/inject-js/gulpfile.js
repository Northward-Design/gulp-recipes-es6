import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';

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
config.dist.js = resolve(config.dist.root, 'scripts');
config.dist.jsEntry = resolve(config.dist.js, 'index.js');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.inject = {};
config.plugins.inject.removeTags = true;
config.plugins.inject.transform = (filePath, file) => {
  return '<script>'+file.contents.toString()+'</script>';
};

export default function injection() {
  return pump(
    src(config.src.html),
    inject(src([config.dist.jsEntry]), config.plugins.inject),
    dest(config.dist.html)
  );
}
