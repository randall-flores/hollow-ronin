#!/usr/bin/env node
/*
 * Product data validator. Runs as `prebuild` so a broken product never
 * reaches production.
 *
 * Gallery contract (must be true for every product):
 *   [0] back design (unique per product)
 *   [1] front view — color-matched brand-mark tee
 *   [2..] model shots (optional)
 *
 * Checks:
 *   1. Every image URL in every product's gallery resolves to a real file
 *      on disk under public/.
 *   2. Every product has a non-empty `designFamily` field.
 *   3. Every product has at least 2 images (back + front).
 *   4. gallery[1] is the brand-mark front-logo tee.
 *   5. gallery[1] color matches the product's color variant (white tee
 *      for White products, black tee for Black products).
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
const FRONT_BLACK   = '/mockups/tee-hollow-ronin-logo-front-black.png';
const FRONT_WHITE   = '/mockups/tee-hollow-ronin-logo-front-white.png';

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

function main() {
  const errors = [];
  const PRODUCTS = loadProducts();

  if (!Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
    errors.push('PRODUCTS export is missing or empty.');
    return report(errors, 0, 0);
  }

  const familyCounts = new Map();

  for (const p of PRODUCTS) {
    const tag = `[${p.slug ?? '<no-slug>'}]`;

    if (!p.slug || typeof p.slug !== 'string') {
      errors.push(`${tag} missing slug`);
    }

    if (!p.designFamily || typeof p.designFamily !== 'string') {
      errors.push(`${tag} missing designFamily`);
    } else {
      familyCounts.set(p.designFamily, (familyCounts.get(p.designFamily) ?? 0) + 1);
    }

    if (!Array.isArray(p.images) || p.images.length < 2) {
      errors.push(`${tag} gallery is incomplete (needs back [0] + front [1], has ${Array.isArray(p.images) ? p.images.length : 0})`);
      continue;
    }

    const expectedFront = p.color === 'White' ? FRONT_WHITE : FRONT_BLACK;
    const frontUrl      = p.images[1]?.url;
    if (frontUrl !== expectedFront) {
      errors.push(`${tag} gallery[1] must be the ${p.color} front view (${expectedFront}); got: ${frontUrl ?? '<missing>'}`);
    }

    for (const img of p.images) {
      if (!img.url || typeof img.url !== 'string') {
        errors.push(`${tag} gallery entry has no url`);
        continue;
      }

      const abs = path.join(PUBLIC_DIR, img.url.replace(/^\//, ''));
      if (!fs.existsSync(abs)) {
        errors.push(`${tag} image file does not exist on disk: ${img.url}`);
      }
    }
  }

  for (const [family, count] of familyCounts) {
    if (count < 1) errors.push(`design family "${family}" has zero variants`);
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
