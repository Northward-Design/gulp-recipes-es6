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
config.src.partials = resolve(config.src.root, 'partials');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.html = config.dist.root;

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.inject1 = {};
config.plugins.inject2 = {};
config.plugins.inject3 = {};
config.plugins.inject1.removeTags = true;
config.plugins.inject2.removeTags = true;
config.plugins.inject3.removeTags = true;
config.plugins.inject1.name = 'head';
config.plugins.inject2.name = 'header';
config.plugins.inject3.name = 'footer';
config.plugins.inject1.transform = (filepath, file) => {
  return file.contents.toString('utf8');
};
config.plugins.inject2.transform = config.plugins.inject1.transform;
config.plugins.inject3.transform = config.plugins.inject1.transform;

export default function injection() {
  return pump(
    src(config.src.html),
    inject(src([`${config.src.partials}/${config.plugins.inject1.name}.html`]), config.plugins.inject1),
    inject(src([`${config.src.partials}/${config.plugins.inject2.name}.html`]), config.plugins.inject2),
    inject(src([`${config.src.partials}/${config.plugins.inject3.name}.html`]), config.plugins.inject3),
    dest(config.dist.html)
  );
}
