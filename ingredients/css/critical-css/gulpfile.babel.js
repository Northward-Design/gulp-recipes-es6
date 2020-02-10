import { resolve } from 'path';

import { src, dest } from 'gulp';
import { default as pump } from 'pump-promise';

import crit from 'critical';

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
config.dist.html = config.dist.root;
config.dist.css = resolve(config.dist.root, 'styles');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.critical = {};
config.plugins.critical.css = [config.dist.css + '/index.css'];
config.plugins.critical.inline = true;
config.plugins.critical.ignore = {atrule: ['@font-face']};
config.plugins.critical.dimensions = [{height: 1440, width: 2560}];

export default function critical() {
  return pump(
    src(config.src.html),
    crit.stream(config.plugins.critical),
    dest(config.dist.html)
  );
}
