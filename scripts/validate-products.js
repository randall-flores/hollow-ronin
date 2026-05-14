#!/usr/bin/env node
/*
 * Product data validator. Runs as `prebuild` so a broken product never
 * reaches production.
 *
 * Field checks (per product):
 *   - slug, name, japaneseName, clan, title, tagline, blurb, story, designFamily
 *   - clan ∈ { Akatsuki, Yami, Kage, Protagonist }
 *   - tagline, blurb, story all non-empty strings
 *   - unique slugs
 *
 * Asset checks (per product, order-agnostic — PDP gallery order lives in
 * lib/card-images.ts and is filtered against the same disk state at
 * build time):
 *   - REQUIRED: /mockups/tee-{slug}-front-{color}.png   (PDP hero default)
 *   - REQUIRED: /mockups/tee-{slug}-back-{color}.png    (listing card default)
 *   - REQUIRED: /sigils/mon-{slug}-transparent.png      (sigil thumb)
 *   - OPTIONAL: /mockups/tee-{slug}-{view}-{color}-model{1,3,4}.png
 *
 * The validator no longer enforces a specific gallery[] array order
 * inside lib/products.ts. Order is computed at render time by
 * productGalleryImages() in lib/card-images.ts.
 *
 * Exits 1 on any failure.
 */

const fs   = require('fs');
const path = require('path');
const ts   = require('typescript');
const Module = require('module');

const REPO_ROOT     = path.resolve(__dirname, '..');
const PRODUCTS_TS   = path.join(REPO_ROOT, 'lib', 'products.ts');
const PUBLIC_DIR    = path.join(REPO_ROOT, 'public');

const VALID_CLANS = new Set(['Akatsuki', 'Yami', 'Kage', 'Protagonist']);
const TEXT_FIELDS = ['name', 'japaneseName', 'clan', 'title', 'tagline', 'blurb', 'story', 'designFamily'];

const CLAN_SIGIL = {
  Akatsuki:    '/sigils/mon-akatsuki-transparent.png',
  Yami:        '/sigils/mon-yami-transparent.png',
  Kage:        '/sigils/mon-kage-transparent.png',
  Protagonist: '/sigils/mon-hollow-ronin-transparent.png',
};

function loadProducts() {
  const src = fs.readFileSync(PRODUCTS_TS, 'utf8');
  const transpiled = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const m = new Module(PRODUCTS_TS, null);
  m.filename = PRODUCTS_TS;
  m.paths    = Module._nodeModulePaths(path.dirname(PRODUCTS_TS));
  m._compile(transpiled, PRODUCTS_TS);
  return m.exports.PRODUCTS;
}

function checkFile(relUrl) {
  const abs = path.join(PUBLIC_DIR, relUrl.replace(/^\//, ''));
  return fs.existsSync(abs);
}

function requiredAssets(product) {
  const slug  = product.slug;
  const color = product.color === 'White' ? 'white' : 'black';
  return [
    `/mockups/tee-${slug}-front-${color}.png`,
    `/mockups/tee-${slug}-back-${color}.png`,
    CLAN_SIGIL[product.clan],
  ];
}

function main() {
  const errors = [];
  const PRODUCTS = loadProducts();

  if (!Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
    errors.push('PRODUCTS export is missing or empty.');
    return report(errors, 0, 0);
  }

  const familyCounts = new Map();
  const seenSlugs    = new Set();

  for (const p of PRODUCTS) {
    const tag = `[${p.slug ?? '<no-slug>'}]`;

    if (!p.slug || typeof p.slug !== 'string') {
      errors.push(`${tag} missing slug`);
      continue;
    }

    if (seenSlugs.has(p.slug)) errors.push(`${tag} duplicate slug`);
    seenSlugs.add(p.slug);

    for (const field of TEXT_FIELDS) {
      if (!p[field] || typeof p[field] !== 'string' || !p[field].trim()) {
        errors.push(`${tag} missing or empty ${field}`);
      }
    }

    if (p.clan && !VALID_CLANS.has(p.clan)) {
      errors.push(`${tag} clan "${p.clan}" not in { Akatsuki, Yami, Kage, Protagonist }`);
    }

    if (p.designFamily) {
      familyCounts.set(p.designFamily, (familyCounts.get(p.designFamily) ?? 0) + 1);
    }

    for (const required of requiredAssets(p)) {
      if (!checkFile(required)) {
        errors.push(`${tag} required asset missing on disk: ${required}`);
      }
    }
  }

  report(errors, PRODUCTS.length, familyCounts.size);
}

function report(errors, productCount, familyCount) {
  if (errors.length === 0) {
    console.log(`✓ validate-products: ${productCount} products across ${familyCount} design families — all checks passed.`);
    process.exit(0);
  }

  console.error(`✗ validate-products: ${errors.length} error(s) found:\n`);
  for (const e of errors) console.error('  • ' + e);
  console.error('');
  process.exit(1);
}

main();
