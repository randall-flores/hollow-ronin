#!/usr/bin/env node
/*
 * One-time seed: create 17 Hollow Ronin products in Shopify via Admin API.
 *
 * Requirements:
 *   - Node 18 or newer (uses global fetch)
 *   - Admin API token with scopes: write_products, write_publications
 *
 * How to generate the Admin token:
 *   Shopify admin → Settings → Apps and sales channels → Develop apps
 *   → Create an app → Configuration → Admin API integration
 *   → Check scopes: write_products, write_publications, read_publications
 *   → Save → Install app → API credentials → reveal Admin API access token
 *
 * Usage (PowerShell):
 *   $env:SHOPIFY_ADMIN_TOKEN="shpat_xxx"; node scripts/seed-products.js
 *
 * Usage (bash):
 *   SHOPIFY_ADMIN_TOKEN=shpat_xxx node scripts/seed-products.js
 *
 * Optional env vars:
 *   SHOPIFY_STORE_DOMAIN  (default: hollow-ronin.myshopify.com)
 *   IMAGE_BASE_URL        (default: https://hollowronin.com)
 */

const TOKEN  = process.env.SHOPIFY_ADMIN_TOKEN;
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || 'hollow-ronin.myshopify.com';
const BASE   = process.env.IMAGE_BASE_URL       || 'https://hollowronin.com';
const API    = `https://${DOMAIN}/admin/api/2024-10/graphql.json`;

if (!TOKEN) {
  console.error('ERROR: SHOPIFY_ADMIN_TOKEN env var required.');
  console.error('       Set it before running this script. See header comment for details.');
  process.exit(1);
}

const SIZES = ['S', 'M', 'L', 'XL'];
const PRICE = '38.00';

const PRODUCTS = [
  { handle: 'the-ronin',           title: 'THE RONIN',            story: 'The torii marks the threshold. The ronin chose to walk through it alone.',                 image: '/mockups/tee-crow-ronin-bloodmoon-back-black.png' },
  { handle: 'the-ronin-white',     title: 'THE RONIN (White)',    story: 'The torii marks the threshold. The ronin chose to walk through it alone.',                 image: '/mockups/tee-crow-ronin-bloodmoon-back-white.png' },
  { handle: 'the-hollow-warrior',  title: 'THE HOLLOW WARRIOR',   story: 'What walks past death is no longer a man — only the promise he refused to break.',        image: '/mockups/tee-skeleton-ronin-redsun-back-black.png' },
  { handle: 'mask-of-wrath',       title: 'MASK OF WRATH',        story: 'Hannya born of fury — horns of grief, eyes that never close.',                             image: '/mockups/tee-cyber-oni-clash-back-black.png' },
  { handle: 'mask-of-mourning',    title: 'MASK OF MOURNING',     story: 'The second mask weeps in silence — the river beneath the fire.',                           image: '/mockups/tee-oni-samurai-dark-back-black.png' },
  { handle: 'mask-of-reckoning',   title: 'MASK OF RECKONING',    story: 'The third mask remembers every name carved into the dark.',                                image: '/mockups/tee-cyber-oni-full-back-black.png' },
  { handle: 'mask-of-stillness',   title: 'MASK OF STILLNESS',    story: 'The fourth mask is the most dangerous — patience sharpened into a blade.',                 image: '/mockups/tee-cyber-oni-portrait-circle-back-black-model3.png' },
  { handle: 'the-inscribed',       title: 'THE INSCRIBED',        story: 'Flesh gone, vow intact — kanji burned across the ribcage of what remained.',               image: '/mockups/tee-skeleton-samurai-kanji-back-black.png' },
  { handle: 'the-dragon',          title: 'THE DRAGON',           story: 'Ryū. The dragon coils upward — neon scale, ink shadow, breath of cold light.',             image: '/mockups/tee-dragon-red-sun-back-black.png' },
  { handle: 'the-fox',             title: 'THE FOX',              story: 'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',          image: '/mockups/tee-kitsune-nine-tails-back-black.png' },
  { handle: 'the-fox-white',       title: 'THE FOX (White)',      story: 'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',          image: '/mockups/tee-kitsune-nine-tails-back-white.png' },
  { handle: 'the-ghost',           title: 'THE GHOST',            story: 'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',                     image: '/mockups/tee-crow-warrior-ghost-back-white.png' },
  { handle: 'the-ghost-black',     title: 'THE GHOST (Black)',    story: 'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',                     image: '/mockups/tee-crow-warrior-ghost-back-black-model4.png' },
  { handle: 'the-sentinel',        title: 'THE SENTINEL',         story: 'The crow stands sentry above the pass. The mountain remembers.',                           image: '/mockups/tee-crow-warrior-bloodmoon-dark-back-white-model4.png' },
  { handle: 'the-sentinel-black',  title: 'THE SENTINEL (Black)', story: 'The crow stands sentry above the pass. The mountain remembers.',                           image: '/mockups/tee-crow-warrior-bloodmoon-dark-back-black.png' },
  { handle: 'the-stormbringer',    title: 'THE STORMBRINGER',     story: 'When his wings open, the sky turns to a colder shade of black.',                           image: '/mockups/tee-crow-samurai-aerial-back-black.png' },
  { handle: 'the-reaper',          title: 'THE REAPER',           story: 'The shadow tengu walks where the light dares not — the final judgment.',                   image: '/mockups/tee-cyberpunk-ninja-neon-back-black.png' },
];

function admin(query, variables) {
  return fetch(API, {
    method:  'POST',
    headers: {
      'Content-Type':           'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables: variables || {} }),
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    if (json.errors) {
      throw new Error('GraphQL: ' + JSON.stringify(json.errors));
    }
    return json.data;
  });
}

function listPublications() {
  return admin(
    'query { publications(first: 50) { edges { node { id name } } } }'
  ).then(function (data) {
    var map = {};
    data.publications.edges.forEach(function (e) { map[e.node.name] = e.node.id; });
    return map;
  });
}

function findProductByHandle(handle) {
  return admin(
    'query Find($q: String!) { products(first: 1, query: $q) { edges { node { id handle } } } }',
    { q: 'handle:' + handle }
  ).then(function (data) {
    return (data.products.edges[0] && data.products.edges[0].node) || null;
  });
}

function productSet(input) {
  return admin(
    'mutation ProductSet($input: ProductSetInput!, $synchronous: Boolean!) {' +
    '  productSet(input: $input, synchronous: $synchronous) {' +
    '    product { id handle title status }' +
    '    userErrors { message field code }' +
    '  }' +
    '}',
    { input: input, synchronous: true }
  ).then(function (data) {
    var r = data.productSet;
    if (r.userErrors && r.userErrors.length) {
      throw new Error('productSet: ' + JSON.stringify(r.userErrors));
    }
    return r.product;
  });
}

function publishProduct(productId, publicationIds) {
  if (!publicationIds.length) return Promise.resolve();
  var input = publicationIds.map(function (pubId) { return { publicationId: pubId }; });
  return admin(
    'mutation Publish($id: ID!, $input: [PublicationInput!]!) {' +
    '  publishablePublish(id: $id, input: $input) {' +
    '    userErrors { message field }' +
    '  }' +
    '}',
    { id: productId, input: input }
  ).then(function (data) {
    var errs = data.publishablePublish.userErrors;
    if (errs && errs.length) {
      console.warn('  ⚠ publish errors: ' + JSON.stringify(errs));
    }
  });
}

function buildInput(p, existingId) {
  var base = {
    handle:          p.handle,
    title:           p.title,
    descriptionHtml: '<p>' + p.story + '</p>',
    productType:     'Shirts',
    vendor:          'Hollow Ronin',
    status:          'ACTIVE',
    productOptions: [{
      name:     'Size',
      position: 1,
      values:   SIZES.map(function (s) { return { name: s }; }),
    }],
    variants: SIZES.map(function (s) {
      return {
        optionValues:    [{ optionName: 'Size', name: s }],
        price:           PRICE,
        inventoryPolicy: 'CONTINUE',
        inventoryItem:   { tracked: false },
      };
    }),
    files: [{
      originalSource: BASE + p.image,
      contentType:    'IMAGE',
      alt:            p.title,
    }],
  };
  if (existingId) base.id = existingId;
  return base;
}

function seedOne(p, publicationIds) {
  return findProductByHandle(p.handle).then(function (existing) {
    var action = existing ? 'updating' : 'creating';
    console.log('\n→ ' + action + ' ' + p.handle);
    return productSet(buildInput(p, existing && existing.id));
  }).then(function (product) {
    console.log('  ✓ ' + product.id + '  (' + product.status + ')');
    return publishProduct(product.id, publicationIds).then(function () {
      if (publicationIds.length) {
        console.log('  ✓ published to ' + publicationIds.length + ' channel(s)');
      }
      return true;
    });
  }).catch(function (err) {
    console.error('  ✗ ' + p.handle + ': ' + err.message);
    return false;
  });
}

function main() {
  console.log('Seeding ' + PRODUCTS.length + ' products into ' + DOMAIN);
  console.log('Image base: ' + BASE);

  return listPublications().then(function (pubs) {
    console.log('Publications found: ' + Object.keys(pubs).join(', '));
    var wanted = ['Headless', 'Online Store'];
    var publicationIds = wanted.map(function (n) { return pubs[n]; }).filter(Boolean);
    if (publicationIds.length === 0) {
      console.warn('⚠ No matching publications. Products will be created but unpublished.');
    }

    var ok = 0, fail = 0;
    return PRODUCTS.reduce(function (chain, p) {
      return chain.then(function () {
        return seedOne(p, publicationIds).then(function (success) {
          if (success) ok++; else fail++;
        });
      });
    }, Promise.resolve()).then(function () {
      console.log('\nDone. ' + ok + ' succeeded, ' + fail + ' failed.');
      process.exit(fail > 0 ? 1 : 0);
    });
  }).catch(function (err) {
    console.error('FATAL: ' + err.message);
    process.exit(1);
  });
}

main();
