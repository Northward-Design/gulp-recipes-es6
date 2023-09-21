import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest, series, parallel, watch } = gulp;
import { default as pump } from 'pump-promise';

import browsersync from 'browser-sync';
import connect from 'gulp-connect-php';

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
config.src.php = resolve(config.src.root, 'php/**/*.php');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.phpconnect = {};
config.plugins.phpconnect.base = config.dist.root;
config.plugins.browsersync = {};
config.plugins.browsersync.proxy = '127.0.0.1:8000';

const sync = browsersync.create();

export function syncPhp() {
  connect.server(config.plugins.phpconnect,
    () => browsersync(config.plugins.browsersync)
  );
}

export function browserSyncReload(done) {
    browsersync.reload();
    done();
}

export function buildPhp() {
  return pump(
    src(config.src.php),
    dest(config.dist.root),
    sync.stream()
  );

}

export function buildHtml() {
  return pump(
    src(config.src.html),
    dest(config.dist.root),
    sync.stream()
  );
}

export function watchFiles()  {
  watch(config.src.html, buildHtml);
  watch(config.src.php, buildPhp);
  watch(config.dist.root, browserSyncReload);
}

export const all = series(buildHtml, buildPhp, parallel(syncPhp, watchFiles));

export default all;
