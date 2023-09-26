import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import gulp from 'gulp';
const { src, dest, parallel } = gulp;
import { default as pump } from 'pump-promise';

import inject from 'gulp-inject';
import { default as responsive } from 'gulp-responsive';
import { stringSet, imgSet } from './string-img-sets.js';

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
config.src.img = resolve(config.src.root, 'images/**/*.{jpg,jpeg}');

config.dist = {};
config.dist.root = resolve(config.root, 'dist');
config.dist.img = resolve(config.dist.root, 'images');
config.dist.html = config.dist.root;

config.clean = {};
config.clean.dist = config.dist.root;

// INJECT RESPONSIVE IMAGE SETTINGS

// Set selector to one of six String and Image Set (0 - 5)
const selector = 5;

// 0 = Small SRCSET                 (5 jpg/webp, multi-breakpoint)
// 1 = Wide SRCSET                  (10 jpg/webp, xsScrn width)
// 2 = Product SRCSET               (10 jpg/webp, multi-breakpoint)
// 3 = Small Lazy Load SRCSET       (5 jpg/webp, multi-breakpoint)
// 4 = Wide(auto) Lazy Load SRCSET  (10 jpg/webp, auto breakpoint)
// 5 = Product Lazy Load SRCSET     (10 jpg/webp, multi-breakpoint)  


// Choose Image Output Widths (px)
const mini = '10'; // Lazy Load Teaser Image
const xs = '640';
const sm = '768';
const md = '1024';
const lg = '1366';
const xl = '1600';

// Choose min-width Breakpoints (px)
const xsBrkpt = '576';
const smBrkpt = '768';
const mdBrkpt = '992';
const lgBrkpt = '1200';
const xlBrkpt = '1600';

// Choose Image Widths at Breakpoints (can use any unit, vw is best practice)
const xsScrn = '100vw';
const smScrn = '75vw';
const mdScrn = '50vw';
const lgScrn = '33vw';
const xlScrn = '25vw';
const xxlScrn = '16.5vw';


// Choose Alt Tags In order that images will be selected (A-Z then a-z)
const alt = [ 
  'Alt Tag For First Image',
  'Alt Tag For Second Image',
  'add another string for each Image'
]

config.plugins = {};
config.plugins.resp = {};
config.plugins.resp.options = {
  progressive: true,
  quality: 60,
  compressionLevel: 9,
  errorOnUnusedConfig: false,
  errorOnUnusedImage: false,
  errorOnEnlargement: false
};

// Responsive Function
config.plugins.resp.settings = () => {
  return imgSet[selector](mini, xs, sm, md, lg, xl);
}

let imgcount = 0;
let altcount = -1;
config.plugins.inject = {};
config.plugins.inject.ignorePath = '../';
config.plugins.inject.relative = true;
config.plugins.inject.removeTags = true;

// Inject Functions
config.plugins.inject.starttag = () => {
  imgcount++;
  return `<!-- inject:img${imgcount} -->`;
};
config.plugins.inject.transform = (filepath) => {
  altcount++;
  let pathName = filepath.substring(0, filepath.lastIndexOf('.'));
  let name = pathName.substring(pathName.lastIndexOf('/')+1);
  return stringSet[selector](pathName, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt[altcount]);
};

// Gulp Tasks
export function responsiveImg() {
  return pump(
    src(config.src.img),
    responsive(config.plugins.resp.settings(), config.plugins.resp.options),
    dest(config.dist.img)
  );
}

export function injection() {
  return pump(
    src(config.src.html),
    inject(src([config.src.img]), config.plugins.inject),
    dest(config.dist.html)
  );
}

export const all = parallel(responsiveImg, injection);

export default all;
