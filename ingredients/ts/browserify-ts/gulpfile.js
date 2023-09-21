import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { dest } = gulp;
import { default as pump } from 'pump-promise';
import { default as source } from 'vinyl-source-stream';

import { default as browserify } from 'browserify';
import { default as tsify } from 'tsify';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
config.files.node_modules = resolve(config.root, 'node_modules');

config.src = {};
config.src.root = resolve(config.root, 'src');
config.src.ts = resolve(config.src.root, 'ts/index.ts');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.ts = resolve(config.dist.root, 'scripts');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.browserify = {};
config.plugins.browserify.entries = [config.src.ts];
config.plugins.source = 'index.js';

export default function buildTs() {
  return pump(
    browserify(config.plugins.browserify)
    .plugin(tsify)
    .bundle(),
    source(config.plugins.source),
    dest(config.dist.ts)
  );
}
