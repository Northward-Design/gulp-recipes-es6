module.exports.smSrcset = smSrcset;
module.exports.mdSrcset = mdSrcset;
module.exports.lgSrcset = lgSrcset;
module.exports.smLazy = smLazy;
module.exports.autoLazy = autoLazy;
module.exports.lgLazy = lgLazy;


// Small Srcset
function smSrcset(path, name, mini, sm, md, lg, alt) {
  return `
    <img class="${name}"
      srcset="
        ${path}-${lg}w.jpg ${lg}w,
        ${path}-${md}w.jpg ${md}w, 
        ${path}-${sm}w.jpg ${sm}w" 
      sizes="
        (min-width: ${lg}px) ${lg}w,
        (min-width: ${md}px) ${md}w"
      src="${path}-${lg}w.jpg" 
    alt="${alt}">`;
}

// Medium Srcset with Multiple webP Sources
function mdSrcset(path, name, mini, sm, md, lg, alt) {
  return `
    <picture>
      <source media="(min-width: ${lg}px)" 
        srcset="
          ${path}-${lg}w.webp, 
          ${path}-${lg}w@2x.webp 2x"   
        type="image/webp"> 
      <source media="(min-width: ${md}px)"
        srcset="
          ${path}-${md}w.webp,
          ${path}-${md}w@2x.webp 2x"
        type="image/webp">
      <source
        srcset="
          ${path}-${sm}w.webp,
          ${path}-${sm}w@2x.webp 2x"
        type="image/webp">
      <img class="${name}"
        srcset="
          ${path}-${sm}w.jpg ${sm}w,
          ${path}-${md}w.jpg ${md}w,
          ${path}-${lg}w.jpg ${lg}w" 
        src="${path}-${lg}w.jpg"
      alt="${alt}">
    </picture>`;
}

// Large Srcset with Multiple webP & Jpg Sources
function lgSrcset(path, name, mini, sm, md, lg, alt) {
  return `
    <picture>
      <source media="(min-width: ${lg}px)"
        srcset="
          ${path}-${lg}w.webp,
          ${path}-${lg}w@2x.webp 2x"
        type="image/webp">
      <source media="(min-width: ${md}px)"
        srcset="
          ${path}-${md}w.webp, 
          ${path}-${md}w@2x.webp 2x"
        type="image/webp">
      <source
        srcset="
          ${path}-${sm}w.webp, 
          ${path}-${sm}w@2x.webp 2x"
        type="image/webp">
      <source media="(min-width: ${lg}px)"
        srcset="
          ${path}-${lg}w.jpg,
          ${path}-${lg}w@2x.jpg 2x"
        type="image/jpg">
      <source media="(min-width: ${md}px)"
        srcset="
          ${path}-${md}w.jpg, 
          ${path}-${md}w@2x.jpg 2x"
        type="image/jpg">
      <img class="${name}"
        srcset=" 
          ${path}-${sm}w.jpg,
          ${path}-${sm}w@2x.jpg 2x"
        src="${path}-${lg}w.jpg"
        alt="${alt}"> 
    </picture>`;
}

// Small Lazy Load Srcset
function smLazy(path, name, mini, sm, md, lg, alt) {
  return `
    <img class="lazy ${name}"
      data-srcset="
        ${path}-${lg}w.jpg ${lg}w, 
        ${path}-${md}w.jpg ${md}w, 
        ${path}-${sm}w.jpg ${sm}w" 
      data-sizes="
        (min-width: ${md}px) ${md}w,
        (min-width: ${lg}px) ${lg}w"
      src="${path}-${mini}w.jpg"
    alt="${alt}">`;
}

// Small Lazy Load Srcset with Auto Sizes
function autoLazy(path, name, mini, sm, md, lg, alt) {
  return `
    <img class="lazy ${name}"
  data-srcset="
    ${path}-${lg}w.jpg ${lg}w, 
    ${path}-${md}w.jpg ${md}w, 
    ${path}-${sm}w.jpg ${sm}w" 
  data-sizes="auto"
  src="${path}-${mini}w.jpg" 
      alt="${alt}">`;
}

// Large Lazy Load Srcset
function lgLazy(path, name, mini, sm, md, lg, alt) {
  return `
    <picture>
      <source media="(min-width: ${lg}px)"
        data-srcset="
          ${path}-${lg}w.webp,
          ${path}-${lg}w@2x.webp 2x"
        type="image/webp">
      <source media="(min-width: ${md}px)"
        data-srcset="
          ${path}-${md}w.webp, 
          ${path}-${md}w@2x.webp 2x"
        type="image/webp">
      <source
        data-srcset="
          ${path}-${sm}w.webp, 
          ${path}-${sm}w@2x.webp 2x"
        type="image/webp">
      <source media="(min-width: ${lg}px)"
        data-srcset="
          ${path}-${lg}w.jpg,
          ${path}-${lg}w@2x.jpg 2x"
        type="image/jpg">
      <source media="(min-width: ${md}px)"
        data-srcset="
          ${path}-${md}w.jpg, 
          ${path}-${md}w@2x.jpg 2x"
        type="image/jpg">
      <img class="lazy ${name}"
        data-srcset="
          ${path}-${sm}w.jpg,
          ${path}-${sm}w@2x.jpg 2x" 
        data-src="${path}-${mini}w.jpg"
      alt="${alt}">
    </picture>`;
}
