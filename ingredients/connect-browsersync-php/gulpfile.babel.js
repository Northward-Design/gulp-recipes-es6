import { resolve } from 'path';

import { watch } from 'gulp';

import browsersync from 'browser-sync';
import connect from 'gulp-connect-php';

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
config.dist.php = resolve(config.dist.root, '**/*.php');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.phpconnect = {};
config.plugins.phpconnect.base = config.dist.root;
config.plugins.browsersync = {};
config.plugins.browsersync.proxy = '127.0.0.1:8000';

export default function syncPhp() {
  connect.server(config.plugins.phpconnect,
    () => browsersync(config.plugins.browsersync)
  );
  watch(config.dist.php).on('change', 
    () => browsersync.reload()
  );
}
