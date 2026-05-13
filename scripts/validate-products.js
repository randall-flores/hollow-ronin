#!/usr/bin/env node
/*
 * Product data validator. Runs as `prebuild` so a broken product never
 * reaches production.
 *
 * Gallery contract (must be true for every product):
 *   [0]  back design — /mockups/tee-{slug}-back-{color}.png
 *   [1]  chest sigil — /sigils/mon-{slug}-transparent.png (per-character)
 *   [2+] model shots — /mockups/tee-{slug}-back-{color}-model{N}.png
 *
 * Field checks (per product):
 *   - slug, name, clan, title, japaneseName, tagline, blurb, story, designFamily
 *   - clan ∈ { Akatsuki, Yami, Kage, Protagonist }
 *   - tagline, blurb, story all non-empty strings
 *   - gallery has at least 2 images (back + sigil)
 *   - gallery[1] url matches /sigils/mon-{slug}-transparent.png
 *   - every image file exists on disk under public/
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

    if (!Array.isArray(p.images) || p.images.length < 2) {
      errors.push(`${tag} gallery is incomplete (needs back [0] + sigil [1], has ${Array.isArray(p.images) ? p.images.length : 0})`);
      continue;
    }

    const expectedSigil = `/sigils/mon-${p.slug}-transparent.png`;
    const sigilUrl      = p.images[1]?.url;
    if (sigilUrl !== expectedSigil) {
      errors.push(`${tag} gallery[1] must be the per-character sigil (${expectedSigil}); got: ${sigilUrl ?? '<missing>'}`);
    }

    const color = (p.color === 'White' ? 'white' : 'black');
    const expectedBack = `/mockups/tee-${p.slug}-back-${color}.png`;
    const backUrl      = p.images[0]?.url;
    if (backUrl !== expectedBack) {
      errors.push(`${tag} gallery[0] must be the back design (${expectedBack}); got: ${backUrl ?? '<missing>'}`);
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
