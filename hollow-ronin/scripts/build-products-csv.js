#!/usr/bin/env node
/*
 * Generates scripts/seed-products.csv using Shopify's canonical column order.
 * Run: node scripts/build-products-csv.js
 *
 * Column order matches Shopify's official product CSV template:
 * https://help.shopify.com/en/manual/products/import-export/using-csv
 */

const fs   = require('fs');
const path = require('path');

const COLUMNS = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Product Category',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Option1 Linked To',
  'Option2 Name',
  'Option2 Value',
  'Option2 Linked To',
  'Option3 Name',
  'Option3 Value',
  'Option3 Linked To',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Variant Barcode',
  'Image Src',
  'Image Position',
  'Image Alt Text',
  'Gift Card',
  'SEO Title',
  'SEO Description',
  'Google Shopping / Google Product Category',
  'Google Shopping / Gender',
  'Google Shopping / Age Group',
  'Google Shopping / MPN',
  'Google Shopping / Condition',
  'Google Shopping / Custom Product',
  'Google Shopping / Custom Label 0',
  'Google Shopping / Custom Label 1',
  'Google Shopping / Custom Label 2',
  'Google Shopping / Custom Label 3',
  'Google Shopping / Custom Label 4',
  'Variant Image',
  'Variant Weight Unit',
  'Variant Tax Code',
  'Cost per item',
  'Included / United States',
  'Price / United States',
  'Compare At Price / United States',
  'Included / International',
  'Price / International',
  'Compare At Price / International',
  'Status',
];

const SIZES = ['S', 'M', 'L', 'XL'];
const PRICE = '38.00';

const PRODUCTS = [
  { handle: 'the-ronin',           title: 'THE RONIN',            sku: 'RONIN-BLK',     story: 'The torii marks the threshold. The ronin chose to walk through it alone.',                 image: '/mockups/tee-crow-ronin-bloodmoon-back-black.png' },
  { handle: 'the-ronin-white',     title: 'THE RONIN (White)',    sku: 'RONIN-WHT',     story: 'The torii marks the threshold. The ronin chose to walk through it alone.',                 image: '/mockups/tee-crow-ronin-bloodmoon-back-white.png' },
  { handle: 'the-hollow-warrior',  title: 'THE HOLLOW WARRIOR',   sku: 'HOLLOW-BLK',    story: 'What walks past death is no longer a man — only the promise he refused to break.',        image: '/mockups/tee-skeleton-ronin-redsun-back-black.png' },
  { handle: 'mask-of-wrath',       title: 'MASK OF WRATH',        sku: 'WRATH-BLK',     story: 'Hannya born of fury — horns of grief, eyes that never close.',                             image: '/mockups/tee-cyber-oni-clash-back-black.png' },
  { handle: 'mask-of-mourning',    title: 'MASK OF MOURNING',     sku: 'MOURNING-BLK',  story: 'The second mask weeps in silence — the river beneath the fire.',                           image: '/mockups/tee-oni-samurai-dark-back-black.png' },
  { handle: 'mask-of-reckoning',   title: 'MASK OF RECKONING',    sku: 'RECKONING-BLK', story: 'The third mask remembers every name carved into the dark.',                                image: '/mockups/tee-cyber-oni-full-back-black.png' },
  { handle: 'mask-of-stillness',   title: 'MASK OF STILLNESS',    sku: 'STILLNESS-BLK', story: 'The fourth mask is the most dangerous — patience sharpened into a blade.',                 image: '/mockups/tee-cyber-oni-portrait-circle-back-black-model3.png' },
  { handle: 'the-inscribed',       title: 'THE INSCRIBED',        sku: 'INSCRIBED-BLK', story: 'Flesh gone, vow intact — kanji burned across the ribcage of what remained.',               image: '/mockups/tee-skeleton-samurai-kanji-back-black.png' },
  { handle: 'the-dragon',          title: 'THE DRAGON',           sku: 'DRAGON-BLK',    story: 'Ryū. The dragon coils upward — neon scale, ink shadow, breath of cold light.',             image: '/mockups/tee-dragon-red-sun-back-black.png' },
  { handle: 'the-fox',             title: 'THE FOX',              sku: 'FOX-BLK',       story: 'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',          image: '/mockups/tee-kitsune-nine-tails-back-black.png' },
  { handle: 'the-fox-white',       title: 'THE FOX (White)',      sku: 'FOX-WHT',       story: 'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',          image: '/mockups/tee-kitsune-nine-tails-back-white.png' },
  { handle: 'the-ghost',           title: 'THE GHOST',            sku: 'GHOST-WHT',     story: 'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',                     image: '/mockups/tee-crow-warrior-ghost-back-white.png' },
  { handle: 'the-ghost-black',     title: 'THE GHOST (Black)',    sku: 'GHOST-BLK',     story: 'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',                     image: '/mockups/tee-crow-warrior-ghost-back-black-model4.png' },
  { handle: 'the-sentinel',        title: 'THE SENTINEL',         sku: 'SENTINEL-WHT',  story: 'The crow stands sentry above the pass. The mountain remembers.',                           image: '/mockups/tee-crow-warrior-bloodmoon-dark-back-white-model4.png' },
  { handle: 'the-sentinel-black',  title: 'THE SENTINEL (Black)', sku: 'SENTINEL-BLK',  story: 'The crow stands sentry above the pass. The mountain remembers.',                           image: '/mockups/tee-crow-warrior-bloodmoon-dark-back-black.png' },
  { handle: 'the-stormbringer',    title: 'THE STORMBRINGER',     sku: 'STORM-BLK',     story: 'When his wings open, the sky turns to a colder shade of black.',                           image: '/mockups/tee-crow-samurai-aerial-back-black.png' },
  { handle: 'the-reaper',          title: 'THE REAPER',           sku: 'REAPER-BLK',    story: 'The shadow tengu walks where the light dares not — the final judgment.',                   image: '/mockups/tee-cyberpunk-ninja-neon-back-black.png' },
];

const IMAGE_BASE = 'https://hollowronin.com';

// RFC 4180 CSV quoting: wrap in double quotes if value contains comma, quote, or newline.
// Escape internal double quotes by doubling them.
function csvQuote(value) {
  if (value === null || value === undefined) return '';
  const s = String(value);
  if (s === '') return '';
  if (/[",\r\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function row(values) {
  return COLUMNS.map(col => csvQuote(values[col] || '')).join(',');
}

function buildVariantRow(product, size, isFirst) {
  const variant = {
    'Handle':                       product.handle,
    'Option1 Name':                 'Size',
    'Option1 Value':                size,
    'Variant SKU':                  `HR-${product.sku}-${size}`,
    'Variant Grams':                '200',
    'Variant Inventory Tracker':    '',
    'Variant Inventory Policy':     'continue',
    'Variant Fulfillment Service':  'manual',
    'Variant Price':                PRICE,
    'Variant Requires Shipping':    'TRUE',
    'Variant Taxable':              'TRUE',
    'Variant Weight Unit':          'g',
    'Gift Card':                    'FALSE',
  };

  if (isFirst) {
    Object.assign(variant, {
      'Title':            product.title,
      'Body (HTML)':      `<p>${product.story}</p>`,
      'Vendor':           'Hollow Ronin',
      'Type':             'Shirts',
      'Tags':             'drop-001, shirt',
      'Published':        'TRUE',
      'Image Src':        `${IMAGE_BASE}${product.image}`,
      'Image Position':   '1',
      'Image Alt Text':   `${product.title} — back design`,
      'Status':           'active',
    });
  }

  return row(variant);
}

function build() {
  const lines = [COLUMNS.join(',')];
  for (const p of PRODUCTS) {
    SIZES.forEach((size, i) => {
      lines.push(buildVariantRow(p, size, i === 0));
    });
  }
  return lines.join('\n') + '\n';
}

const outPath = path.join(__dirname, 'seed-products.csv');
fs.writeFileSync(outPath, build(), 'utf8');
console.log(`Wrote ${outPath}`);
console.log(`Products: ${PRODUCTS.length}, Variants: ${PRODUCTS.length * SIZES.length}, Total rows: ${PRODUCTS.length * SIZES.length + 1}`);
