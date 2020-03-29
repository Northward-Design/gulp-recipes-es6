module.exports.stringSet = [
simpleSrcString,
wideSrcString,
productSrcString,
simpleLazyString,
autoLazyString,
productLazyString
]

module.exports.imgSet = [
simpleSrcImg,
wideSrcImg,
productSrcImg,
simpleLazyImg,
autoLazyImg,
productLazyImg
]

// Small Srcset
function simpleSrcString(dataUrl, path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
  return `
    <picture>
      <source
        srcset="
          ${path}-${xs}w.webp ${xs}w,
          ${path}-${sm}w.webp ${sm}w,
          ${path}-${md}w.webp ${md}w,
          ${path}-${lg}w.webp ${lg}w,
          ${path}-${xl}w.webp ${xl}w"
        sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${lgBrkpt}px) ${xlScrn},
          (min-width: ${mdBrkpt}px) ${lgScrn},
          (min-width: ${smBrkpt}px) ${mdScrn},
          (min-width: ${xsBrkpt}px) ${smScrn},
          ${xsScrn}"
      type="image/webp">
      <img class="${name}"
        srcset="
          ${path}-${xs}w.jpg ${xs}w,
          ${path}-${sm}w.jpg ${sm}w,
          ${path}-${md}w.jpg ${md}w,
          ${path}-${lg}w.jpg ${lg}w,
          ${path}-${xl}w.jpg ${xl}w"
        sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${lgBrkpt}px) ${xlScrn},
          (min-width: ${mdBrkpt}px) ${lgScrn},
          (min-width: ${smBrkpt}px) ${mdScrn},
          (min-width: ${xsBrkpt}px) ${smScrn},
          ${xsScrn}"
        src="${path}-${lg}w.jpg" 
      alt="${alt}">
    </picture>`;
}

function simpleSrcImg(mini, xs, sm, md, lg, xl) {
  return {'*.{jpg,jpeg}': [
    { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.jpg'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.jpg'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.jpg'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.jpg'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.webp'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.webp'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.webp'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.webp'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.webp'}
    }
  ]}
}

// Medium Srcset with Multiple webP Sources
function wideSrcString(dataUrl, path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
  return `
    <picture>
      <source
        srcset="
          ${path}-${xs}w.webp ${xs}w,
          ${path}-${sm}w.webp ${sm}w,
          ${path}-${md}w.webp ${md}w,
          ${path}-${lg}w.webp ${lg}w,
          ${path}-${xl}w.webp ${xl}w,
          ${path}-${xs}w@3x.webp ${xs * 3}w,
          ${path}-${md}w@2x.webp ${md * 2}w,
          ${path}-${lg}w@2x.webp ${lg * 2}w,
          ${path}-${xl}w@2x.webp ${xl * 2}w,
          ${path}-${md}w@4x.webp ${md * 4}w"
        sizes="${xsScrn}"
        type="image/webp">
      <img class="${name}"
        srcset="
          ${path}-${xs}w.jpeg ${xs}w,
          ${path}-${sm}w.jpeg ${sm}w,
          ${path}-${md}w.jpeg ${md}w,
          ${path}-${lg}w.jpeg ${lg}w,
          ${path}-${xl}w.jpeg ${xl}w,
          ${path}-${xs}w@3x.jpeg ${xs * 3}w,
          ${path}-${md}w@2x.jpeg ${md * 2}w,
          ${path}-${lg}w@2x.jpeg ${lg * 2}w,
          ${path}-${xl}w@2x.jpeg ${xl * 2}w,
          ${path}-${md}w@4x.jpeg ${md * 4}w"
        sizes="${xsScrn}"
        src="${path}-${lg}w.jpg"
      alt="${alt}">
    </picture>`;
}

function wideSrcImg(mini, xs, sm, md, lg, xl) {
  return {'*.{jpg,jpeg}': [
    { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.jpg'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.jpg'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.jpg'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.jpg'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.jpg'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@3x`, extname: '.jpg'}
    }, {
      width: md * 2,
      rename: {suffix: `-${md}w@2x`, extname: '.jpg'}
    }, {
      width: lg * 2,
      rename: {suffix: `-${lg}w@2x`, extname: '.jpg'}
    }, {
      width: xl * 2,
      rename: {suffix: `-${xl}w@2x`, extname: '.jpg'}
    }, {
      width: md * 4,
      rename: {suffix: `-${md}w@4x`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.webp'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.webp'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.webp'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.webp'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.webp'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@3x`, extname: '.webp'}
    }, {
      width: md * 2,
      rename: {suffix: `-${md}w@2x`, extname: '.webp'}
    }, {
      width: lg * 2,
      rename: {suffix: `-${lg}w@2x`, extname: '.webp'}
    }, {
      width: xl * 2,
      rename: {suffix: `-${xl}w@2x`, extname: '.webp'}
    }, {
      width: md * 4,
      rename: {suffix: `-${md}w@4x`, extname: '.webp'}
    }  
  ]}
}

// Large Srcset with Multiple webP & Jpg Sources
function productSrcString(dataUrl, path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
  return `
    <picture>
      <source
        srcset="
          ${path}-${xs}w@quart.webp ${xs/4}w,
          ${path}-${sm}w@third.webp ${sm/3}w,
          ${path}-${xs}w@half.webp ${xs/2}w,
          ${path}-${xs}w.webp ${xs}w,
          ${path}-${sm}w.webp ${sm}w,
          ${path}-${md}w.webp ${md}w,
          ${path}-${lg}w.webp ${lg}w,
          ${path}-${xl}w.webp ${xl}w,
          ${path}-${xs}w@3x.webp ${xs * 3}w,
          ${path}-${md}w@2x.webp ${md * 2}w"
        sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${mdBrkpt}px) ${xlScrn},
          (min-width: ${smBrkpt}px) ${lgScrn},
          (min-width: ${xsBrkpt}px) ${mdScrn},
          ${smScrn}"
        type="image/webp">
      <img class="${name}"
        srcset="
          ${path}-${xs}w@quart.jpg ${xs/4}w,
          ${path}-${sm}w@third.jpg ${sm/3}w,
          ${path}-${xs}w@half.jpg ${xs/2}w,
          ${path}-${xs}w.jpeg ${xs}w,
          ${path}-${sm}w.jpeg ${sm}w,
          ${path}-${md}w.jpeg ${md}w,
          ${path}-${lg}w.jpeg ${lg}w,
          ${path}-${xl}w.jpeg ${xl}w,
          ${path}-${xs}w@3x.jpeg ${xs * 3}w,
          ${path}-${md}w@2x.jpeg ${md * 2}w"
        sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${mdBrkpt}px) ${xlScrn},
          (min-width: ${smBrkpt}px) ${lgScrn},
          (min-width: ${xsBrkpt}px) ${mdScrn},
          ${smScrn}"
        src="${path}-${lg}w.jpg"
      alt="${alt}">
    </picture>`;
}

function productSrcImg(mini, xs, sm, md, lg, xl) {
  return {'*.{jpg,jpeg}': [
    { 
      width: xs / 4,
      rename: {suffix: `-${xs}w@quart`, extname: '.jpg'}
    }, { 
      width: sm / 3,
      rename: {suffix: `-${sm}w@third`, extname: '.jpg'}
    }, { 
      width: xs / 2,
      rename: {suffix: `-${xs}w@half`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.jpg'}
    }, {      
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.jpg'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.jpg'}
    }, { 
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.jpg'}
    }, { 
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.jpg'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@x3`, extname: '.jpg'}
    }, { 
      width: md * 2,
      rename: {suffix: `-${md}w@x2`, extname: '.jpg'}
    }, { 
      width: xs / 4,
      rename: {suffix: `-${xs}w@quart`, extname: '.webp'}
    }, { 
      width: sm / 3,
      rename: {suffix: `-${sm}w@third`, extname: '.webp'}
    }, { 
      width: xs / 2,
      rename: {suffix: `-${xs}w@half`, extname: '.webp'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.webp'}
    }, {      
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.webp'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.webp'}
    }, { 
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.webp'}
    }, { 
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.webp'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@x3`, extname: '.webp'}
    }, { 
      width: md * 2,
      rename: {suffix: `-${md}w@x2`, extname: '.webp'}
    } 
  ]}
}

let miniImg;

// Small Lazy Load Srcset
function simpleLazyString(dataUrl, path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
  dataUrl ? miniImg = `inline('${path}-${mini}w.jpg')` : miniImg = `${path}-${mini}w.jpg`;
  return `
    <picture>
        <source
        data-srcset="
          ${path}-${xs}w.webp ${xs}w,
          ${path}-${sm}w.webp ${sm}w,
          ${path}-${md}w.webp ${md}w,
          ${path}-${lg}w.webp ${lg}w,
          ${path}-${xl}w.webp ${xl}w"
        data-sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${lgBrkpt}px) ${xlScrn},
          (min-width: ${mdBrkpt}px) ${lgScrn},
          (min-width: ${smBrkpt}px) ${mdScrn},
          (min-width: ${xsBrkpt}px) ${smScrn},
          ${xsScrn}"
      type="image/webp">
        <img class="lazy ${name}"
        data-srcset="
          ${path}-${xs}w.jpg ${xs}w,
          ${path}-${sm}w.jpg ${sm}w,
          ${path}-${md}w.jpg ${md}w,
          ${path}-${lg}w.jpg ${lg}w,
          ${path}-${xl}w.jpg ${xl}w" 
        data-sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${lgBrkpt}px) ${xlScrn},
          (min-width: ${mdBrkpt}px) ${lgScrn},
          (min-width: ${smBrkpt}px) ${mdScrn},
          (min-width: ${xsBrkpt}px) ${smScrn},
          ${xsScrn}"
        src="${miniImg}"
      alt="${alt}">
    </picture>`;
}

function simpleLazyImg(mini, xs, sm, md, lg, xl) {
  return {'*.{jpg,jpeg}': [
    { 
      width: mini,
      rename: {suffix: `-${mini}w`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.jpg'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.jpg'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.jpg'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.jpg'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.webp'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.webp'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.webp'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.webp'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.webp'}
    }
  ]}
}

// Small Lazy Load Srcset with Auto Sizes
function autoLazyString(dataUrl, path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
  dataUrl ? miniImg = `inline('${path}-${mini}w.jpg')` : miniImg = `${path}-${mini}w.jpg`;
  return `
    <picture>
      <source
        data-srcset="
          ${path}-${xs}w.webp ${xs}w,
          ${path}-${sm}w.webp ${sm}w,
          ${path}-${md}w.webp ${md}w,
          ${path}-${lg}w.webp ${lg}w,
          ${path}-${xl}w.webp ${xl}w,
          ${path}-${xs}w@3x.webp ${xs * 3}w,
          ${path}-${md}w@2x.webp ${md * 2}w,
          ${path}-${lg}w@2x.webp ${lg * 2}w,
          ${path}-${xl}w@2x.webp ${xl * 2}w,
          ${path}-${md}w@4x.webp ${md * 4}w"
        data-sizes="auto"
        type="image/webp">
      <img class="lazy ${name}"
        data-srcset="
          ${path}-${xs}w.jpeg ${xs}w,
          ${path}-${sm}w.jpeg ${sm}w,
          ${path}-${md}w.jpeg ${md}w,
          ${path}-${lg}w.jpeg ${lg}w,
          ${path}-${xl}w.jpeg ${xl}w,
          ${path}-${xs}w@3x.jpeg ${xs * 3}w,
          ${path}-${md}w@2x.jpeg ${md * 2}w,
          ${path}-${lg}w@2x.jpeg ${lg * 2}w,
          ${path}-${xl}w@2x.jpeg ${xl * 2}w,
          ${path}-${md}w@4x.jpeg ${md * 4}w"
        data-sizes="auto"
        src="${miniImg}"
      alt="${alt}">
    </picture>`;
}


function autoLazyImg(mini, xs, sm, md, lg, xl) {
  return {'*.{jpg,jpeg}': [
    { 
      width: mini,
      rename: {suffix: `-${mini}w`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.jpg'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.jpg'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.jpg'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.jpg'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.jpg'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@3x`, extname: '.jpg'}
    }, {
      width: md * 2,
      rename: {suffix: `-${md}w@2x`, extname: '.jpg'}
    }, {
      width: lg * 2,
      rename: {suffix: `-${lg}w@2x`, extname: '.jpg'}
    }, {
      width: xl * 2,
      rename: {suffix: `-${xl}w@2x`, extname: '.jpg'}
    }, {
      width: md * 4,
      rename: {suffix: `-${md}w@4x`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.webp'}
    }, { 
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.webp'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.webp'}
    }, {
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.webp'}
    }, {
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.webp'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@3x`, extname: '.webp'}
    }, {
      width: md * 2,
      rename: {suffix: `-${md}w@2x`, extname: '.webp'}
    }, {
      width: lg * 2,
      rename: {suffix: `-${lg}w@2x`, extname: '.webp'}
    }, {
      width: xl * 2,
      rename: {suffix: `-${xl}w@2x`, extname: '.webp'}
    }, {
      width: md * 4,
      rename: {suffix: `-${md}w@4x`, extname: '.webp'}
    }
  ]}
}

// Large Lazy Load Srcset
function productLazyString(dataUrl, path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
  dataUrl ? miniImg = `inline('${path}-${mini}w.jpg')` : miniImg = `${path}-${mini}w.jpg`;
  return `
    <picture>
      <source
        data-srcset="
          ${path}-${xs}w@quart.webp ${xs/4}w,
          ${path}-${sm}w@third.webp ${sm/3}w,
          ${path}-${xs}w@half.webp ${xs/2}w,
          ${path}-${xs}w.webp ${xs}w,
          ${path}-${sm}w.webp ${sm}w,
          ${path}-${md}w.webp ${md}w,
          ${path}-${lg}w.webp ${lg}w,
          ${path}-${xl}w.webp ${xl}w,
          ${path}-${xs}w@3x.webp ${xs * 3}w,
          ${path}-${md}w@2x.webp ${md * 2}w"
        data-sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${mdBrkpt}px) ${xlScrn},
          (min-width: ${smBrkpt}px) ${lgScrn},
          (min-width: ${xsBrkpt}px) ${mdScrn},
          ${smScrn}"
        type="image/webp">
      <img class="lazy ${name}"
        data-srcset="
          ${path}-${xs}w@quart.jpg ${xs/4}w,
          ${path}-${sm}w@third.jpg ${sm/3}w,
          ${path}-${xs}w@half.jpg ${xs/2}w,
          ${path}-${xs}w.jpeg ${xs}w,
          ${path}-${sm}w.jpeg ${sm}w,
          ${path}-${md}w.jpeg ${md}w,
          ${path}-${lg}w.jpeg ${lg}w,
          ${path}-${xl}w.jpeg ${xl}w,
          ${path}-${xs}w@3x.jpeg ${xs * 3}w,
          ${path}-${md}w@2x.jpeg ${md * 2}w"
        data-sizes="
          (min-width: ${xlBrkpt}px) ${xxlScrn},
          (min-width: ${mdBrkpt}px) ${xlScrn},
          (min-width: ${smBrkpt}px) ${lgScrn},
          (min-width: ${xsBrkpt}px) ${mdScrn},
          ${smScrn}"
        src="${miniImg}"
      alt="${alt}">
    </picture>`;
}

function productLazyImg(mini, xs, sm, md, lg, xl) {
  return {'*.{jpg,jpeg}': [
    { 
      width: mini,
      rename: {suffix: `-${mini}w`, extname: '.jpg'}
    }, { 
      width: xs / 4,
      rename: {suffix: `-${xs}w@quart`, extname: '.jpg'}
    }, { 
      width: sm / 3,
      rename: {suffix: `-${sm}w@third`, extname: '.jpg'}
    }, { 
      width: xs / 2,
      rename: {suffix: `-${xs}w@half`, extname: '.jpg'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.jpg'}
    }, {      
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.jpg'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.jpg'}
    }, { 
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.jpg'}
    }, { 
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.jpg'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@x3`, extname: '.jpg'}
    }, { 
      width: md * 2,
      rename: {suffix: `-${md}w@x2`, extname: '.jpg'}
    }, { 
      width: xs / 4,
      rename: {suffix: `-${xs}w@quart`, extname: '.webp'}
    }, { 
      width: sm / 3,
      rename: {suffix: `-${sm}w@third`, extname: '.webp'}
    }, { 
      width: xs / 2,
      rename: {suffix: `-${xs}w@half`, extname: '.webp'}
    }, { 
      width: xs,
      rename: {suffix: `-${xs}w`, extname: '.webp'}
    }, {      
      width: sm,
      rename: {suffix: `-${sm}w`, extname: '.webp'}
    }, {
      width: md,
      rename: {suffix: `-${md}w`, extname: '.webp'}
    }, { 
      width: lg,
      rename: {suffix: `-${lg}w`, extname: '.webp'}
    }, { 
      width: xl,
      rename: {suffix: `-${xl}w`, extname: '.webp'}
    }, {
      width: xs * 3,
      rename: {suffix: `-${xs}w@x3`, extname: '.webp'}
    }, { 
      width: md * 2,
      rename: {suffix: `-${md}w@x2`, extname: '.webp'}
    }
  ]};
}
