import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src } = gulp;
import pump from 'pump-promise';

import stylelint from '@ronilaukkarinen/gulp-stylelint';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
config.files.node_modules = resolve(config.root, 'node_modules');

config.src = {};
config.src.root = resolve(config.root, 'src');
config.src.sass = resolve(config.src.root, 'sass/**/*.scss');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};

config.plugins.stylelint = {};
config.plugins.stylelint.customSyntax = 'postcss-scss';
config.plugins.stylelint.reporters = [
  {formatter: 'string', console: true}
];

export default function lintSass() {
  return pump(
    src(config.src.sass),
    stylelint(config.plugins.stylelint)
   );
}
