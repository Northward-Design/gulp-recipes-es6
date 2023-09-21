import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest } = gulp;
import { default as pump } from 'pump-promise';

import sitemap from 'gulp-sitemap';

const config = {};

config.root = path.dirname(fileURLToPath(import.meta.url));

config.env = {};
config.env.development = process.env.NODE_ENV !== 'production';

config.files = {};
config.files.package = resolve(config.root, 'package.json');
config.files.node_modules = resolve(config.root, 'node_modules');

config.src = {};
config.src.root = resolve(config.root, 'src');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.htmlsrc = resolve(config.dist.root, '*.html'); 

config.clean = {};
config.clean.dist = config.dist.root;

config.plugins = {};
config.plugins.sitemap = {};
config.plugins.sitemap.siteUrl = 'http://www.example-site.com';

export default function buildSitemap() {
  return pump(
    src(config.dist.htmlsrc, {read: false}),
    sitemap(config.plugins.sitemap),
    dest(config.dist.root)
  );
}
