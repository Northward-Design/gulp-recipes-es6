export const stringSet = [
smallSrcString,
wideSrcString,
productSrcString,
smallLazyString,
autoLazyString,
productLazyString
]

// Small Srcset
function smallSrcString(path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
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

// Wide Srcset
function wideSrcString(path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
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

// Product Srcset
function productSrcString(path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
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

// Small Lazy Load Srcset
function smallLazyString(path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
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
        src="${path}-${mini}w.jpg"
      alt="${alt}">
    </picture>`;
}

// Wide (auto) Lazy Load Srcset
function autoLazyString(path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
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
        sizes=""
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
        src="${path}-${mini}w.jpg"
      alt="${alt}">
    </picture>`;
}

// Product Lazy Load Srcset
function productLazyString(path, name, mini, xs, sm, md, lg, xl, xsBrkpt, smBrkpt, mdBrkpt, lgBrkpt, xlBrkpt, xsScrn, smScrn, mdScrn, lgScrn, xlScrn, xxlScrn, alt) {
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
        src="${path}-${mini}w.jpg"
      alt="${alt}">
    </picture>`;
}
