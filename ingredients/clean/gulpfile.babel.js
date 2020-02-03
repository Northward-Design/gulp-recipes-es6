import { resolve } from 'path';

import { default as del } from 'del';

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

config.dist = {};
config.dist.root = resolve(config.root, 'dist');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};

export default function clean() {
  return del(config.clean.dist);
}
