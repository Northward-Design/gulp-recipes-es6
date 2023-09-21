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
config.src.partials = resolve(config.src.root, 'partials');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root;

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.injectHead = {};
config.plugins.injectHeader = {};
config.plugins.injectFooter = {};
config.plugins.injectHead.removeTags = true;
config.plugins.injectHeader.removeTags = true;
config.plugins.injectFooter.removeTags = true;
config.plugins.injectHead.name = 'head';
config.plugins.injectHeader.name = 'header';
config.plugins.injectFooter.name = 'footer';
config.plugins.injectHead.transform = (filepath, file) => {
  return file.contents.toString('utf8');
};
config.plugins.injectHeader.transform = config.plugins.injectHead.transform;
config.plugins.injectFooter.transform = config.plugins.injectHead.transform;

export default function injection() {
  return pump(
    src(config.src.html),
    inject(src([`${config.src.partials}/${config.plugins.injectHead.name}.html`]), config.plugins.injectHead),
    inject(src([`${config.src.partials}/${config.plugins.injectHeader.name}.html`]), config.plugins.injectHeader),
    inject(src([`${config.src.partials}/${config.plugins.injectFooter.name}.html`]), config.plugins.injectFooter),
    dest(config.dist.html)
  );
}
