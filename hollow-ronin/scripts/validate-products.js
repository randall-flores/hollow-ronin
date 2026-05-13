#!/usr/bin/env node
/*
 * Product data validator. Runs as `prebuild` so a broken product never
 * reaches production.
 *
 * Checks:
 *   1. Every image URL in every product's gallery resolves to a real file
 *      on disk under public/.
 *   2. No product's gallery contains the shared brand-mark front-logo tee
 *      (tee-hollow-ronin-logo-front-*.png). This is a regression guard:
 *      that image previously appeared in every product's gallery and was
 *      the root cause of the "wrong design in thumbnails" bug.
 *   3. Every product has a non-empty `designFamily` field.
 *   4. Every product has at least one gallery image.
 *   5. Every designFamily groups at least one product (trivially true if 3
 *      passes, but stated explicitly so the report shows family counts).
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
const LOGO_PATTERN  = /tee-hollow-ronin-logo-front-/;

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

    if (!Array.isArray(p.images) || p.images.length === 0) {
      errors.push(`${tag} has no gallery images`);
      continue;
    }

    for (const img of p.images) {
      if (!img.url || typeof img.url !== 'string') {
        errors.push(`${tag} gallery entry has no url`);
        continue;
      }

      if (LOGO_PATTERN.test(img.url)) {
        errors.push(`${tag} contains shared logo tee in gallery: ${img.url}`);
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
