# Drop 004 — "Weathered Exile" Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch 4 Colortone 1300 Mineral Wash tees (`$59`) + 1 Champion 1720TU packable anorak (`$109`) by extending color + category types, adding editorial entries, building two new shop routes, wiring color-swatch OOS rendering and PDP shallow routing, and regenerating the sitemap.

**Architecture:** Data flow stays unchanged — Shopify Storefront API is source of truth for variants, `lib/products.ts` is source of truth for editorial. New extension points: (1) `lib/colors.ts` consolidates the color slug union + folder map + swatch hex that today lives duplicated across `shopify-products.ts`, `card-images.ts`, `ProductGridCard.jsx`, and `ProductPage.tsx`. (2) `Category` union grows `'tees'` and `'outerwear'`. (3) New routes `/shop/tees`, `/shop/outerwear`, `/shop/all` reuse `ProductShellPage` with category filter. (4) New OOS rendering is an additive extension to `ProductGridCard` (full-color OOS swatch) and `ProductPage` (color swatch disabled state).

**Tech Stack:** Next.js 16 App Router (React 19), TypeScript, Shopify Admin GraphQL via `mcp__claude_ai_Shopify__graphql_mutation` MCP tool, Shopify Storefront API for runtime reads, local Next.js dev server for verification.

---

## Design decisions (locked in via user input)

1. **Category:** Drop 004 tees use new `'tees'` category. Drop 001 stays `'shirts'`. `/shop/shirts` unchanged, `/shop/tees` only shows Drop 004 + future tees.
2. **/shop/all:** New page — flat list of every family across categories.
3. **Mockup folder convention:** Follow existing `/public/mockups/{imageFolder}/{color-lowercase}/tee-{imageFolder}-{front|back}-{color-lowercase}.png` pattern. Spec's flat `/public/mockups/tees/{design}-{color}.png` naming is overridden so the existing `lib/card-images.ts` resolver works without modification.

---

## File Structure

| Path | Role | Action |
|------|------|--------|
| Shopify Admin (Mon no Mukō tee, Karasu-Tengu tee) | Live data | Create Mineral Black OOS variants × 5 sizes via `productVariantsBulkCreate` |
| Shopify Admin (5 new products, 13 SKUs) | Live data | Set `custom.design_family`, `custom.color`, `custom.collection_drop`, `custom.product_category` metafields |
| `lib/colors.ts` | New | Single source of truth: `ColorSlug` union, `SWATCH_HEX` map, `colorToFolder`, `normalizeColor`, `isMineralWash` |
| `lib/shopify-products.ts` | Modify | Re-export from `lib/colors.ts`; remove local `normalizeColor` |
| `lib/card-images.ts` | Modify | Import `colorToFolder` from `lib/colors.ts`; delete local copy |
| `lib/products.ts` | Modify | Extend `Category` union with `'tees'` + `'outerwear'`; add 5 editorial entries; update palette comment re: purple |
| `lib/product-merge.ts` | Modify | Extend `pickLead` priority list to include mineral colors |
| `components/ProductGridCard.jsx` | Modify | Import `SWATCH_HEX` from `lib/colors.ts`; add full-color OOS swatch styling; accept `availableByColor` prop |
| `components/ProductShellPage.jsx` | Modify | Pass per-color availability map into `ProductGridCard` |
| `components/three/ProductPage.tsx` | Modify | Import `SWATCH_HEX` from `lib/colors.ts`; add color-level OOS swatch state; wire `router.replace` shallow routing for color swap; mobile sticky CTA edge cases |
| `app/shop/tees/page.jsx` | Create | `<ProductShellPage title="TEES" subtitle="DROP 004 // WEATHERED EXILE" category="tees" />` |
| `app/shop/outerwear/page.jsx` | Create | `<ProductShellPage title="OUTERWEAR" subtitle="DRIFTER COLLECTION" category="outerwear" />` |
| `app/shop/all/page.jsx` | Create | Flat list of every family, newest-first |
| `app/shop/page.jsx` | Modify | Add `tees` + `outerwear` to `CATEGORIES` constant |
| `app/sitemap.ts` | Modify | Add new static routes `/shop/tees`, `/shop/outerwear`, `/shop/all` |
| `public/mockups/{family}/{color}/...` | Create | Place renamed mockups in convention-conforming subfolders |

---

## Order of operations

Strict ordering — many tasks depend on Shopify data being live.

1. **Task 1** — Shopify Admin: create Black OOS variants on Mon no Mukō + Karasu-Tengu tees
2. **Task 2** — Shopify Admin: set metafields on all 5 new products
3. **Task 3** — Shopify Admin: verify Headless channel publication + run inventory query
4. **Task 4** — Code: extract `lib/colors.ts`, extend `ColorSlug` + `Category`
5. **Task 5** — Code: add 5 editorial entries to `lib/products.ts`
6. **Task 6** — Assets: rename + place mockup files under `/public/mockups/`
7. **Task 7** — Code: new routes `/shop/tees`, `/shop/outerwear`, `/shop/all`
8. **Task 8** — Code: color-level OOS rendering (grid card + PDP)
9. **Task 9** — Code: PDP color-swap shallow routing
10. **Task 10** — Code: mobile sticky CTA edge cases
11. **Task 11** — Code: sitemap regeneration
12. **Task 12** — Verify: build pass + dev-server spot check
13. **Task 13** — Commit + push + deploy
14. **Task 14** — Channel-sync audit on production

---

## Task 1: Create Black OOS variants on Mon no Mukō + Karasu-Tengu tees

User has deleted yesterday's duplicate OOS placeholder products. Now backfill Mineral Black as proper OOS variants on the surviving parent products.

**Files:**
- Shopify Admin (no local file changes)

- [ ] **Step 1.1: Find the parent product GIDs**

Run via `mcp__claude_ai_Shopify__graphql_query`:

```graphql
query FindDrop004Parents {
  products(first: 10, query: "title:'Mon no Muko' OR title:'Karasu-Tengu' status:active") {
    edges {
      node {
        id
        handle
        title
        options { name values }
        variants(first: 25) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions { name value }
            }
          }
        }
      }
    }
  }
}
```

Expected: 2 product nodes — Mon no Mukō tee and Karasu-Tengu tee. Each currently has Color options Grey + Navy + Purple (Mon) or Grey + Purple (Karasu) but missing Black.

Record the two parent GIDs as `MON_GID` and `KARASU_GID`.

- [ ] **Step 1.2: Add Mineral Black × 5 sizes to Mon no Mukō**

```graphql
mutation BulkCreateVariants($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: REMOVE_STANDALONE_VARIANT) {
    product { id }
    productVariants {
      id
      title
      sku
      inventoryItem { id tracked }
      selectedOptions { name value }
    }
    userErrors { field message }
  }
}
```

Variables (substitute `MON_GID`):

```json
{
  "productId": "MON_GID",
  "variants": [
    { "optionValues": [{ "optionName": "Color", "name": "Mineral Black" }, { "optionName": "Size", "name": "S"   }], "price": "59.00", "inventoryItem": { "tracked": true } },
    { "optionValues": [{ "optionName": "Color", "name": "Mineral Black" }, { "optionName": "Size", "name": "M"   }], "price": "59.00", "inventoryItem": { "tracked": true } },
    { "optionValues": [{ "optionName": "Color", "name": "Mineral Black" }, { "optionName": "Size", "name": "L"   }], "price": "59.00", "inventoryItem": { "tracked": true } },
    { "optionValues": [{ "optionName": "Color", "name": "Mineral Black" }, { "optionName": "Size", "name": "XL"  }], "price": "59.00", "inventoryItem": { "tracked": true } },
    { "optionValues": [{ "optionName": "Color", "name": "Mineral Black" }, { "optionName": "Size", "name": "2XL" }], "price": "59.00", "inventoryItem": { "tracked": true } }
  ]
}
```

Expected: 5 `productVariants` returned with new GIDs. `userErrors` empty. Record returned variant GIDs for Step 1.4.

- [ ] **Step 1.3: Repeat Step 1.2 for Karasu-Tengu**

Same mutation, substitute `KARASU_GID`. Record returned variant GIDs.

- [ ] **Step 1.4: Set `continueSellingWhenOutOfStock = false` + inventory = 0 on the new variants**

Inventory is `tracked: true` from creation, but quantity defaults to 0 (correct) and `inventoryPolicy` defaults to `DENY` (which is what we want — site renders as OOS). Verify with:

```graphql
query VerifyOOS($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on ProductVariant {
      id
      title
      inventoryPolicy
      inventoryItem { tracked }
      inventoryQuantity
    }
  }
}
```

Pass the 10 variant GIDs from Steps 1.2 + 1.3 in `ids`.

Expected: every node returns `inventoryPolicy: DENY`, `tracked: true`, `inventoryQuantity: 0`.

If any returns `inventoryPolicy: CONTINUE`, fix with:

```graphql
mutation FixPolicy($id: ID!) {
  productVariantUpdate(input: { id: $id, inventoryPolicy: DENY }) {
    productVariant { id inventoryPolicy }
    userErrors { field message }
  }
}
```

- [ ] **Step 1.5: Publish to Headless sales channel**

Look up the Headless channel publication ID:

```graphql
query HeadlessChannel {
  publications(first: 10) {
    edges { node { id name } }
  }
}
```

Find the publication node where `name` includes "Headless" — record as `HEADLESS_PUB_ID`.

Then for each new variant's parent product, ensure published:

```graphql
mutation PublishToHeadless($id: ID!, $publicationId: ID!) {
  publishablePublish(id: $id, input: { publicationId: $publicationId }) {
    userErrors { field message }
  }
}
```

Run twice: once with `id: MON_GID` and once with `id: KARASU_GID`.

Expected: empty `userErrors` for both. (If parents were already published, this is a no-op.)

- [ ] **Step 1.6: Fallback if Admin GraphQL fails**

If any mutation in Steps 1.2–1.5 returns persistent `userErrors`, halt and present the user with manual Shopify Admin instructions:

> "Open Shopify Admin → Products → Mon no Mukō → Variants → Add variant → Color: Mineral Black, Size: S/M/L/XL/2XL. Set inventory tracking = ON, quantity = 0, continue selling when out of stock = OFF. Repeat for Karasu-Tengu. Then publish both products to Headless sales channel. Reply 'done' when complete."

Pause execution until user confirms.

- [ ] **Step 1.7: No commit yet (Shopify-side change only)**

---

## Task 2: Set metafields on the 5 new Drop 004 products

**Files:**
- Shopify Admin (no local file changes)

- [ ] **Step 2.1: Find all 5 product GIDs + variant GIDs**

```graphql
query FindDrop004Products {
  products(first: 20, query: "vendor:'Hollow Ronin' status:active created_at:>2026-05-15") {
    edges {
      node {
        id
        handle
        title
        productType
        variants(first: 50) {
          edges {
            node {
              id
              title
              selectedOptions { name value }
            }
          }
        }
      }
    }
  }
}
```

Expected: 5 products — Mon no Mukō, Hone no Chikai, Mu no Kamen, Karasu-Tengu, Hyōhaku no Hane. Record each parent GID.

Build a map:

| Product title contains | designFamily metafield value | collection_drop | product_category |
|---|---|---|---|
| `Mon no Muko` (tee) | `mon-no-muko` | `drop-004-tees` | `tees` |
| `Hone no Chikai` (tee) | `hone-no-chikai` | `drop-004-tees` | `tees` |
| `Mu no Kamen` (tee) | `mu-no-kamen` | `drop-004-tees` | `tees` |
| `Karasu-Tengu` (tee) | `karasu-tengu` | `drop-004-tees` | `tees` |
| `Hyōhaku no Hane` (anorak) | `hyohaku-no-hane` | *(omit)* | `outerwear` |

- [ ] **Step 2.2: Set product-level metafields**

`metafieldsSet` accepts up to 25 entries per call. We need 4 metafields × 5 products = up to 20 entries (anorak skips `collection_drop`, so 19). One call.

```graphql
mutation SetProductMetafields($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields { id namespace key value ownerType }
    userErrors { field message code }
  }
}
```

Variables (substitute actual GIDs from Step 2.1):

```json
{
  "metafields": [
    { "ownerId": "MON_GID",     "namespace": "custom", "key": "design_family",    "type": "single_line_text_field", "value": "mon-no-muko" },
    { "ownerId": "MON_GID",     "namespace": "custom", "key": "collection_drop",  "type": "single_line_text_field", "value": "drop-004-tees" },
    { "ownerId": "MON_GID",     "namespace": "custom", "key": "product_category", "type": "single_line_text_field", "value": "tees" },

    { "ownerId": "HONE_GID",    "namespace": "custom", "key": "design_family",    "type": "single_line_text_field", "value": "hone-no-chikai" },
    { "ownerId": "HONE_GID",    "namespace": "custom", "key": "collection_drop",  "type": "single_line_text_field", "value": "drop-004-tees" },
    { "ownerId": "HONE_GID",    "namespace": "custom", "key": "product_category", "type": "single_line_text_field", "value": "tees" },

    { "ownerId": "MU_GID",      "namespace": "custom", "key": "design_family",    "type": "single_line_text_field", "value": "mu-no-kamen" },
    { "ownerId": "MU_GID",      "namespace": "custom", "key": "collection_drop",  "type": "single_line_text_field", "value": "drop-004-tees" },
    { "ownerId": "MU_GID",      "namespace": "custom", "key": "product_category", "type": "single_line_text_field", "value": "tees" },

    { "ownerId": "KARASU_GID",  "namespace": "custom", "key": "design_family",    "type": "single_line_text_field", "value": "karasu-tengu" },
    { "ownerId": "KARASU_GID",  "namespace": "custom", "key": "collection_drop",  "type": "single_line_text_field", "value": "drop-004-tees" },
    { "ownerId": "KARASU_GID",  "namespace": "custom", "key": "product_category", "type": "single_line_text_field", "value": "tees" },

    { "ownerId": "HYOHAKU_GID", "namespace": "custom", "key": "design_family",    "type": "single_line_text_field", "value": "hyohaku-no-hane" },
    { "ownerId": "HYOHAKU_GID", "namespace": "custom", "key": "product_category", "type": "single_line_text_field", "value": "outerwear" }
  ]
}
```

Expected: 14 metafields returned. `userErrors` empty.

- [ ] **Step 2.3: Set variant-level metafields (`custom.color` per variant)**

The current `lib/shopify-products.ts` reads `custom.color` from the product, not the variant. But Drop 004 products have multiple colors per parent (since we created Black variants in Task 1). For now we set `custom.color` at the variant level for forward compatibility and read color from `selectedOptions.Color` at runtime instead.

Build variant-level metafield payload. For each variant from Step 2.1, derive color from `selectedOptions.Color`:

| selectedOptions.Color value | custom.color metafield value |
|---|---|
| `Mineral Grey` | `MINERAL-GREY` |
| `Mineral Black` | `MINERAL-BLACK` |
| `Mineral Navy` | `MINERAL-NAVY` |
| `Mineral Purple` | `MINERAL-PURPLE` |
| `Black` (anorak) | `BLACK` |

Batch in calls of ≤25 metafields per `metafieldsSet`. Expected count: 4 tees × ~15 variants/tee + 1 anorak × 5 variants = ~65 metafields, so 3 calls.

```graphql
mutation SetVariantMetafields($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields { id namespace key value ownerType }
    userErrors { field message code }
  }
}
```

Per variant payload entry:

```json
{ "ownerId": "<VARIANT_GID>", "namespace": "custom", "key": "color", "type": "single_line_text_field", "value": "MINERAL-GREY" }
```

- [ ] **Step 2.4: Verify metafields by re-running Step 2.1's query with metafield selections**

```graphql
query VerifyMetafields {
  products(first: 20, query: "vendor:'Hollow Ronin' status:active created_at:>2026-05-15") {
    edges {
      node {
        id
        handle
        designFamily:   metafield(namespace: "custom", key: "design_family")    { value }
        collectionDrop: metafield(namespace: "custom", key: "collection_drop")  { value }
        productCategory:metafield(namespace: "custom", key: "product_category") { value }
        variants(first: 50) {
          edges { node { id title color: metafield(namespace: "custom", key: "color") { value } } }
        }
      }
    }
  }
}
```

Expected: every product has `designFamily.value` populated. 4 tees have `collectionDrop.value = "drop-004-tees"`. Anorak has `productCategory.value = "outerwear"`. Every variant has `color.value` populated.

- [ ] **Step 2.5: No commit yet (Shopify-side change only)**

---

## Task 3: Confirm Storefront API sees all 5 new products

**Files:**
- Read-only: Storefront API via `lib/shopify-products.ts`

- [ ] **Step 3.1: Curl-test the live Storefront API**

```bash
curl -X POST "https://${NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: ${NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN}" \
  -d '{"query":"{ products(first: 30, sortKey: CREATED_AT, reverse: true) { edges { node { handle title designFamily: metafield(namespace: \"custom\", key: \"design_family\") { value } } } } }"}' \
  | head -c 4000
```

Expected: response includes all 5 new products with `designFamily.value` populated. If a product is missing, it's not published to the Headless channel — return to Task 1, Step 1.5.

- [ ] **Step 3.2: No commit yet — Shopify data verified, ready for code work**

---

## Task 4: Create `lib/colors.ts` — single source of truth

**Files:**
- Create: `lib/colors.ts`
- Modify: `lib/shopify-products.ts`
- Modify: `lib/card-images.ts`

- [ ] **Step 4.1: Create `lib/colors.ts`**

```ts
/*
 * Source of truth for color slugs across the storefront.
 *
 * Previously the color list was duplicated across:
 *   - lib/shopify-products.ts   (ColorSlug union + normalizeColor)
 *   - lib/card-images.ts        (colorToFolder)
 *   - components/ProductGridCard.jsx + components/three/ProductPage.tsx (SWATCH_HEX)
 *
 * Adding Drop 004 mineral wash colors required touching all four files.
 * Consolidating here keeps the next color drop to a single edit.
 *
 * NOTE on palette guardrails: purple was previously gated to the Yami clan.
 * As of Drop 004 (Weathered Exile, May 2026), purple is permitted across all
 * clans when stock availability dictates. The palette is no longer clan-locked.
 */

export type ColorSlug =
  | 'BLACK'
  | 'WHITE'
  | 'PEPPER'
  | 'ESPRESSO'
  | 'IVORY'
  | 'MINERAL-GREY'
  | 'MINERAL-BLACK'
  | 'MINERAL-NAVY'
  | 'MINERAL-PURPLE'

export type ColorFolder =
  | 'black'
  | 'white'
  | 'pepper'
  | 'espresso'
  | 'ivory'
  | 'mineral-grey'
  | 'mineral-black'
  | 'mineral-navy'
  | 'mineral-purple'

export const SWATCH_HEX: Record<ColorSlug, string> = {
  'BLACK':          '#1a1a1a',
  'WHITE':          '#e8e2d6',
  'PEPPER':         '#4a4a4a',
  'ESPRESSO':       '#3d2817',
  'IVORY':          '#f4ede2',
  'MINERAL-GREY':   '#8A8782',
  'MINERAL-BLACK':  '#0F0F0F',
  'MINERAL-NAVY':   '#1C2338',
  'MINERAL-PURPLE': '#4B3A5C',
}

const FOLDER_MAP: Record<ColorSlug, ColorFolder> = {
  'BLACK':          'black',
  'WHITE':          'white',
  'PEPPER':         'pepper',
  'ESPRESSO':       'espresso',
  'IVORY':          'ivory',
  'MINERAL-GREY':   'mineral-grey',
  'MINERAL-BLACK':  'mineral-black',
  'MINERAL-NAVY':   'mineral-navy',
  'MINERAL-PURPLE': 'mineral-purple',
}

export function colorToFolder(c: ColorSlug): ColorFolder {
  return FOLDER_MAP[c] ?? 'black'
}

/**
 * Normalize a raw color string from Shopify (any case, hyphen or underscore)
 * to the canonical ColorSlug. Unrecognized values fall back to 'BLACK'.
 */
export function normalizeColor(raw: string | null | undefined): ColorSlug {
  if (!raw) return 'BLACK'
  const canon = raw.trim().toUpperCase().replace(/_/g, '-')
  switch (canon) {
    case 'WHITE':          return 'WHITE'
    case 'PEPPER':         return 'PEPPER'
    case 'ESPRESSO':       return 'ESPRESSO'
    case 'IVORY':          return 'IVORY'
    case 'MINERAL-GREY':
    case 'MINERAL GREY':   return 'MINERAL-GREY'
    case 'MINERAL-BLACK':
    case 'MINERAL BLACK':  return 'MINERAL-BLACK'
    case 'MINERAL-NAVY':
    case 'MINERAL NAVY':   return 'MINERAL-NAVY'
    case 'MINERAL-PURPLE':
    case 'MINERAL PURPLE': return 'MINERAL-PURPLE'
    default:               return 'BLACK'
  }
}

/** Human-friendly display name for the swatch label / size-row chip. */
export function colorLabel(c: ColorSlug): string {
  switch (c) {
    case 'BLACK':          return 'Black'
    case 'WHITE':          return 'White'
    case 'PEPPER':         return 'Pepper'
    case 'ESPRESSO':       return 'Espresso'
    case 'IVORY':          return 'Ivory'
    case 'MINERAL-GREY':   return 'Mineral Grey'
    case 'MINERAL-BLACK':  return 'Mineral Black'
    case 'MINERAL-NAVY':   return 'Mineral Navy'
    case 'MINERAL-PURPLE': return 'Mineral Purple'
  }
}

export function isMineralWash(c: ColorSlug): boolean {
  return c.startsWith('MINERAL-')
}
```

- [ ] **Step 4.2: Refactor `lib/shopify-products.ts` to consume `lib/colors.ts`**

Open `lib/shopify-products.ts`. Replace:

```ts
export type ColorSlug = 'BLACK' | 'WHITE' | 'PEPPER' | 'ESPRESSO' | 'IVORY'
```

with:

```ts
export type { ColorSlug } from './colors'
import { normalizeColor } from './colors'
```

And delete the local `normalizeColor` function (lines 108–115 in the current file). The new import takes its place. Verify the `normalize` function on line 117 still calls `normalizeColor(node.color?.value)` — that call resolves to the imported function with no syntax change needed.

- [ ] **Step 4.3: Refactor `lib/card-images.ts` to consume `lib/colors.ts`**

Open `lib/card-images.ts`. Replace the first import block:

```ts
import { type ColorSlug } from './shopify-products'
```

with:

```ts
import { type ColorSlug, colorToFolder } from './colors'
```

Then delete the local `type ColorFolder` declaration and the local `colorToFolder` function (lines 21–31). The imported version is the only one in scope.

- [ ] **Step 4.4: Run `tsc --noEmit` to confirm zero type errors**

```bash
npx tsc --noEmit 2>&1 | tail -30
```

Expected: zero errors. If any file imports `ColorSlug` from `lib/shopify-products.ts`, the re-export at Step 4.2 keeps that call site working — verify by grepping:

```bash
```
Use Grep tool with pattern `from ['"]@?/?lib/shopify-products['"]` to surface any consumers and confirm they all still type-check.

- [ ] **Step 4.5: Commit**

```bash
git add lib/colors.ts lib/shopify-products.ts lib/card-images.ts
git commit -m "refactor(colors): extract single source of truth in lib/colors.ts

Consolidates ColorSlug, SWATCH_HEX, colorToFolder, normalizeColor —
previously duplicated across shopify-products.ts, card-images.ts,
ProductGridCard.jsx, ProductPage.tsx. Adds mineral wash colors for Drop 004."
```

---

## Task 5: Extend `Category` union + `pickLead` priority

**Files:**
- Modify: `lib/products.ts`
- Modify: `lib/product-merge.ts`
- Modify: `lib/sizes.ts`

- [ ] **Step 5.1: Extend `Category` union in `lib/products.ts`**

Open `lib/products.ts`. Change the `Category` declaration from:

```ts
export type Category =
  | 'shirts'
  | 'hoodies'
  | 'joggers'
  | 'hats'
  | 'beanies'
  | 'socks'
  | 'scarfs'
  | 'masked-hoodies'
```

to:

```ts
export type Category =
  | 'shirts'
  | 'tees'
  | 'hoodies'
  | 'joggers'
  | 'hats'
  | 'beanies'
  | 'socks'
  | 'scarfs'
  | 'masked-hoodies'
  | 'outerwear'
```

- [ ] **Step 5.2: Update `lib/products.ts` import for `ColorSlug`**

The file currently imports `ColorSlug` from `./shopify-products`. Change to:

```ts
import type { ColorSlug } from './colors'
```

(Task 4.2 already preserves the re-export so existing path also still works — this is a cleanup.)

- [ ] **Step 5.3: Extend `pickLead` priority list in `lib/product-merge.ts`**

Open `lib/product-merge.ts`. Find the `priority` array on line 59:

```ts
const priority: ColorSlug[] = ['BLACK', 'PEPPER', 'ESPRESSO', 'IVORY', 'WHITE']
```

Replace with:

```ts
const priority: ColorSlug[] = [
  'BLACK',
  'MINERAL-BLACK',
  'PEPPER',
  'MINERAL-NAVY',
  'MINERAL-GREY',
  'ESPRESSO',
  'MINERAL-PURPLE',
  'IVORY',
  'WHITE',
]
```

Rationale: in-stock dark colors lead by default; mineral wash inserts where it would fit the existing dark-first rule. Per-design `leadColor` override still wins.

- [ ] **Step 5.4: Add `tees` + `outerwear` to canonical sizes in `lib/sizes.ts`**

Open `lib/sizes.ts`. Update the `SIZES_BY_CATEGORY` map:

```ts
const SIZES_BY_CATEGORY: Partial<Record<Category, readonly string[]>> = {
  shirts:           APPAREL_SIZES,
  tees:             APPAREL_SIZES,
  hoodies:          APPAREL_SIZES,
  'masked-hoodies': APPAREL_SIZES,
  joggers:          APPAREL_SIZES,
  outerwear:        APPAREL_SIZES,
}
```

- [ ] **Step 5.5: Build sanity check**

```bash
npm run build 2>&1 | tail -40
```

Expected: `✓ Compiled successfully`. No new TypeScript errors. (The new categories aren't routed yet — that's Task 7.)

- [ ] **Step 5.6: Commit**

```bash
git add lib/products.ts lib/product-merge.ts lib/sizes.ts
git commit -m "feat(types): extend Category with tees + outerwear, extend pickLead priority"
```

---

## Task 6: Add 5 editorial entries to `lib/products.ts`

**Files:**
- Modify: `lib/products.ts`

- [ ] **Step 6.1: Append the 5 entries**

Open `lib/products.ts`. After the last entry in `EDITORIAL` (currently `sweatpant-kurokitsune`, before the closing `}` of the `EDITORIAL` constant), insert:

```ts
  // ──────────────────────────────────────────────
  // DROP 004 — WEATHERED EXILE (Mineral Wash tees + Hyōhaku no Hane anorak)
  // ──────────────────────────────────────────────

  'mon-no-muko': {
    designFamily: 'mon-no-muko',
    name:         'MON NO MUKŌ',
    japaneseName: 'Mon no Mukō',
    kanji:        '門の向こう',
    clan:         'Protagonist',
    title:        'Beyond the Gate',
    subtitle:     'Beyond the Gate',
    tagline:      'He answers to no master.',
    blurb:        'He answers to no master.',
    story:        'Walks through the broken torii without flag or lord. The mineral wash carries the dust of every road he has refused to leave.',
    description:  '100% cotton, 6.5oz Colortone 1300 mineral wash. Garment-dyed, hand-feel softened, oversized fit. Back print: 門の向こう — Beyond the Gate.',
    tag:          'DROP 004 / NO CLAN',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 004',
    category:     'tees',
    imageFolder:  'mon-no-muko',
    leadColor:    'MINERAL-PURPLE',
  },

  'hone-no-chikai': {
    designFamily: 'hone-no-chikai',
    name:         'HONE NO CHIKAI',
    japaneseName: 'Hone no Chikai',
    kanji:        '骨の誓い',
    clan:         'Akatsuki',
    title:        'Bone Oath',
    subtitle:     'Bone Oath',
    tagline:      'Bound by crimson. Sworn in bone.',
    blurb:        'Bound by crimson. Sworn in bone.',
    story:        'A vow that outlived the flesh that swore it. Carried by the Crimson Clan in mineral wash — softened by weather, hardened by oath.',
    description:  '100% cotton, 6.5oz Colortone 1300 mineral wash. Garment-dyed, oversized fit. Back print: 骨の誓い — Bone Oath.',
    tag:          'DROP 004 / AKATSUKI-GUMI',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 004',
    category:     'tees',
    imageFolder:  'hone-no-chikai',
    leadColor:    'MINERAL-NAVY',
  },

  'mu-no-kamen': {
    designFamily: 'mu-no-kamen',
    name:         'MU NO KAMEN',
    japaneseName: 'Mu no Kamen',
    kanji:        '無の仮面',
    clan:         'Yami',
    title:        'Mask of Nothing',
    subtitle:     'Mask of Nothing',
    tagline:      'Behind the mask, only void.',
    blurb:        'Behind the mask, only void.',
    story:        'The fourth mask does not move. The fourth mask does not speak. Behind the fourth mask, the void wears your shape.',
    description:  '100% cotton, 6.5oz Colortone 1300 mineral wash. Garment-dyed, oversized fit. Back print: 無の仮面 — Mask of Nothing.',
    tag:          'DROP 004 / YAMI-GUMI',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 004',
    category:     'tees',
    imageFolder:  'mu-no-kamen',
    leadColor:    'MINERAL-PURPLE',
  },

  'karasu-tengu': {
    designFamily: 'karasu-tengu',
    name:         'KARASU-TENGU',
    japaneseName: 'Karasu-Tengu',
    kanji:        '烏天狗',
    clan:         'Kage',
    title:        'Crow Tengu',
    subtitle:     'Crow Tengu',
    tagline:      'Messenger of the masked dead.',
    blurb:        'Messenger of the masked dead.',
    story:        'The crow flies between the gate and the grave. He carries the names the living refused to speak. The mineral wash is the colour of fog on the mountain at first light.',
    description:  '100% cotton, 6.5oz Colortone 1300 mineral wash. Garment-dyed, oversized fit. Back print: 烏天狗 — Crow Tengu.',
    tag:          'DROP 004 / KAGE-GUMI',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 004',
    category:     'tees',
    imageFolder:  'karasu-tengu',
    leadColor:    'MINERAL-GREY',
  },

  'hyohaku-no-hane': {
    designFamily: 'hyohaku-no-hane',
    name:         'HYŌHAKU NO HANE',
    japaneseName: 'Hyōhaku no Hane',
    kanji:        '漂泊の羽',
    clan:         'Protagonist',
    title:        "Drifter's Wing",
    subtitle:     "Drifter's Wing",
    tagline:      'For the road that has no end.',
    blurb:        'For the road that has no end.',
    story:        'A packable shell for the long walk. The gold torii embroidered at the chest is the mark of the Mon no Mukō — the gate he passed through alone.',
    description:  'Champion 1720TU packable anorak. Embroidered gold torii at front-left chest. Made for the road that has no end.',
    tag:          'CORE / OUTERWEAR',
    accent:       '#c9a961',
    bg:           '#0A0A0A',
    label:        'CORE',
    category:     'outerwear',
    imageFolder:  'hyohaku-no-hane',
    leadColor:    'BLACK',
  },
```

Note on the Mon no Mukō / Karasu-Tengu naming collision: both `hoodie-mon-no-muko` and now `mon-no-muko` exist in `EDITORIAL`. The hoodie's `designFamily` key is `hoodie-mon-no-muko` (different key). Same applies to `karasu-tengu-sentinel` (Drop 001 tee, `category: 'shirts'`) vs. `karasu-tengu` (Drop 004 tee, `category: 'tees'`). Each is a distinct editorial family because the Shopify products have distinct `custom.design_family` values. Confirmed no collision.

- [ ] **Step 6.2: Build sanity check**

```bash
npm run build 2>&1 | tail -40
```

Expected: `✓ Compiled successfully`. If the build complains about missing mockups (404s during ISR), that's expected — Task 7 places them.

- [ ] **Step 6.3: Commit**

```bash
git add lib/products.ts
git commit -m "feat(drop-004): add editorial entries for 4 mineral wash tees + anorak"
```

---

## Task 7: Place mockup assets under `/public/mockups/`

**Source:** User's raw Printify exports live on Desktop:

| Design | Source folder | Color subfolders present |
|---|---|---|
| Mon no Mukō | `C:\Users\randa\OneDrive\Desktop\Designs\Washed Shirts\Mon no Mukō\` | `Mon no Mukō (Black)`, `Mon no Mukō (Grey)`, `Mon no Mukō (Navy)`, `Mon No Muko Purple` |
| Hone no Chikai | `C:\Users\randa\OneDrive\Desktop\Designs\Washed Shirts\Hone no Chikai\` | `Hone no Chikai Black`, `Hone no Chikai Grey`, `Hone no Chikai Navy` |
| Mu no Kamen | `C:\Users\randa\OneDrive\Desktop\Designs\Washed Shirts\Mu no Kamen Yami Gumi\` | `Mu no Kamen  Yami-Gumi (Black)`, `Mu no Kamen  Yami-Gumi (Grey)`, `Mu no Kamen  Yami-Gumi (Purple)` (note double-space in folder name) |
| Karasu-Tengu | `C:\Users\randa\OneDrive\Desktop\Designs\Washed Shirts\Karasu Tengu\` | `Karasu-Tengu Black`, `Karasu-Tengu Grey`, `Karasu-Tengu Purple` |
| Hyōhaku no Hane | `C:\Users\randa\OneDrive\Desktop\Designs\Hyōhaku no Hane\` | Flat — Front/Back/Person N files at root |

Each color subfolder contains `Front.png`, `Back.png`, `Person 1.png`, `Person 2.png` (some Mon Black/Purple have `(1)` suffixes from re-exports — those are duplicates we skip).

**Destination convention** (per `lib/card-images.ts`):

```
/public/mockups/{imageFolder}/{color-folder}/tee-{imageFolder}-front-{color-folder}.png
/public/mockups/{imageFolder}/{color-folder}/tee-{imageFolder}-back-{color-folder}.png
/public/mockups/{imageFolder}/{color-folder}/extras/person-1-front-{color-folder}.png
/public/mockups/{imageFolder}/{color-folder}/extras/person-2-front-{color-folder}.png
```

(The `extras/` folder is auto-scanned by `productGalleryImages` in `card-images.ts:101`; filenames matching `-front-` sort first.)

- [ ] **Step 7.1: Migrate the 4 tee designs from Desktop into `/public/mockups/`**

Run from repo root:

```powershell
$Designs = 'C:\Users\randa\OneDrive\Desktop\Designs\Washed Shirts'

# (sourceColorDir, imageFolder, colorSlug)
$jobs = @(
  @{ src = "$Designs\Mon no Mukō\Mon no Mukō (Black)";              folder = 'mon-no-muko';   color = 'mineral-black'  },
  @{ src = "$Designs\Mon no Mukō\Mon no Mukō (Grey)";               folder = 'mon-no-muko';   color = 'mineral-grey'   },
  @{ src = "$Designs\Mon no Mukō\Mon no Mukō (Navy)";               folder = 'mon-no-muko';   color = 'mineral-navy'   },
  @{ src = "$Designs\Mon no Mukō\Mon No Muko Purple";               folder = 'mon-no-muko';   color = 'mineral-purple' },

  @{ src = "$Designs\Hone no Chikai\Hone no Chikai Black";          folder = 'hone-no-chikai'; color = 'mineral-black' },
  @{ src = "$Designs\Hone no Chikai\Hone no Chikai Grey";           folder = 'hone-no-chikai'; color = 'mineral-grey'  },
  @{ src = "$Designs\Hone no Chikai\Hone no Chikai Navy";           folder = 'hone-no-chikai'; color = 'mineral-navy'  },

  @{ src = "$Designs\Mu no Kamen Yami Gumi\Mu no Kamen  Yami-Gumi (Black)";  folder = 'mu-no-kamen'; color = 'mineral-black'  },
  @{ src = "$Designs\Mu no Kamen Yami Gumi\Mu no Kamen  Yami-Gumi (Grey)";   folder = 'mu-no-kamen'; color = 'mineral-grey'   },
  @{ src = "$Designs\Mu no Kamen Yami Gumi\Mu no Kamen  Yami-Gumi (Purple)"; folder = 'mu-no-kamen'; color = 'mineral-purple' },

  @{ src = "$Designs\Karasu Tengu\Karasu-Tengu Black";              folder = 'karasu-tengu';  color = 'mineral-black'  },
  @{ src = "$Designs\Karasu Tengu\Karasu-Tengu Grey";               folder = 'karasu-tengu';  color = 'mineral-grey'   },
  @{ src = "$Designs\Karasu Tengu\Karasu-Tengu Purple";             folder = 'karasu-tengu';  color = 'mineral-purple' }
)

foreach ($j in $jobs) {
  if (-not (Test-Path $j.src)) { Write-Warning "MISSING SOURCE: $($j.src)"; continue }

  $dst       = "public\mockups\$($j.folder)\$($j.color)"
  $extras    = "$dst\extras"
  if (-not (Test-Path $dst))    { New-Item -ItemType Directory -Force $dst    | Out-Null }
  if (-not (Test-Path $extras)) { New-Item -ItemType Directory -Force $extras | Out-Null }

  # Pick canonical Front + Back (prefer un-suffixed; fall back to `(1)` re-export)
  $front = Get-ChildItem $j.src -Filter 'Front.png' -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $front) { $front = Get-ChildItem $j.src -Filter 'Front *.png' -ErrorAction SilentlyContinue | Select-Object -First 1 }
  if (-not $front) { $front = Get-ChildItem $j.src -Filter 'Front (1).png' -ErrorAction SilentlyContinue | Select-Object -First 1 }

  $back = Get-ChildItem $j.src -Filter 'Back.png' -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $back) { $back = Get-ChildItem $j.src -Filter 'Back (1).png' -ErrorAction SilentlyContinue | Select-Object -First 1 }

  if ($front) { Copy-Item $front.FullName "$dst\tee-$($j.folder)-front-$($j.color).png" -Force }
  if ($back)  { Copy-Item $back.FullName  "$dst\tee-$($j.folder)-back-$($j.color).png"  -Force }

  # Person shots → extras/. Filename prefix `-front-` so the auto-scanner ranks them as worn-front.
  $p1 = Get-ChildItem $j.src -Filter 'Person 1.png' -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $p1) { $p1 = Get-ChildItem $j.src -Filter 'Person 1 (1).png' -ErrorAction SilentlyContinue | Select-Object -First 1 }
  if ($p1) { Copy-Item $p1.FullName "$extras\person-1-front-$($j.color).png" -Force }

  $p2 = Get-ChildItem $j.src -Filter 'Person 2.png' -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $p2) { $p2 = Get-ChildItem $j.src -Filter 'Person 2 (1).png' -ErrorAction SilentlyContinue | Select-Object -First 1 }
  if ($p2) { Copy-Item $p2.FullName "$extras\person-2-front-$($j.color).png" -Force }

  Write-Host "[OK] $($j.folder)/$($j.color) — front:$([bool]$front) back:$([bool]$back) p1:$([bool]$p1) p2:$([bool]$p2)"
}
```

Expected: 13 `[OK]` lines (4 + 3 + 3 + 3). Every line shows `front:True back:True p1:True p2:True`.

- [ ] **Step 7.2: Migrate Hyōhaku no Hane (flat source layout)**

```powershell
$src    = 'C:\Users\randa\OneDrive\Desktop\Designs\Hyōhaku no Hane'
$dst    = 'public\mockups\hyohaku-no-hane\black'
$extras = "$dst\extras"
New-Item -ItemType Directory -Force $dst    | Out-Null
New-Item -ItemType Directory -Force $extras | Out-Null

Copy-Item "$src\Front.png"          "$dst\tee-hyohaku-no-hane-front-black.png" -Force
Copy-Item "$src\Back.png"           "$dst\tee-hyohaku-no-hane-back-black.png"  -Force
Copy-Item "$src\Person 1 Front.png" "$extras\person-1-front-black.png" -Force
Copy-Item "$src\Person 1 Back.png"  "$extras\person-1-back-black.png"  -Force
Copy-Item "$src\Person 2 Front.png" "$extras\person-2-front-black.png" -Force
Copy-Item "$src\Person 2 Back.png"  "$extras\person-2-back-black.png"  -Force
Write-Host "[OK] hyohaku-no-hane/black"
```

- [ ] **Step 7.3: Verify file tree**

```powershell
Get-ChildItem public\mockups\mon-no-muko, public\mockups\hone-no-chikai, public\mockups\mu-no-kamen, public\mockups\karasu-tengu, public\mockups\hyohaku-no-hane -Recurse -File | Measure-Object | Select-Object Count
```

Expected: `Count` = 4 designs × 3–4 colors × 4 files + Hyōhaku 6 files ≈ 60–62 files total.

- [ ] **Step 7.4: Commit**

```bash
git add public/mockups/mon-no-muko public/mockups/hone-no-chikai public/mockups/mu-no-kamen public/mockups/karasu-tengu public/mockups/hyohaku-no-hane
git commit -m "feat(drop-004): add mockup assets for 4 tees + 1 anorak (13 color variants, ~60 files)"
```

---

## Task 8: New routes — /shop/tees, /shop/outerwear, /shop/all

**Files:**
- Create: `app/shop/tees/page.jsx`
- Create: `app/shop/outerwear/page.jsx`
- Create: `app/shop/all/page.jsx`
- Modify: `app/shop/page.jsx`

- [ ] **Step 8.1: Create `app/shop/tees/page.jsx`**

```jsx
import ProductShellPage from "@/components/ProductShellPage";

export const metadata = {
  title: "Tees · The Armory",
  description:
    "Drop 004 — Weathered Exile. Mineral wash Colortone 1300 tees, garment-dyed, oversized. Limited print run.",
  alternates: { canonical: "/shop/tees" },
};

export const revalidate = 3600;

export default function TeesPage() {
  return (
    <ProductShellPage
      title="TEES"
      subtitle="DROP 004 // WEATHERED EXILE"
      category="tees"
    />
  );
}
```

- [ ] **Step 8.2: Create `app/shop/outerwear/page.jsx`**

```jsx
import ProductShellPage from "@/components/ProductShellPage";

export const metadata = {
  title: "Outerwear · The Armory",
  description:
    "Packable shells for the long walk. The Drifter collection — built for the road that has no end.",
  alternates: { canonical: "/shop/outerwear" },
};

export const revalidate = 3600;

export default function OuterwearPage() {
  return (
    <ProductShellPage
      title="OUTERWEAR"
      subtitle="DRIFTER COLLECTION"
      category="outerwear"
    />
  );
}
```

- [ ] **Step 8.3: Create `app/shop/all/page.jsx`**

This is a new flat listing that does not filter by category. It composes the existing `ProductGridCard` directly because `ProductShellPage` requires a `category`.

```jsx
import Link from 'next/link';
import { getAllFamilies } from '@/lib/product-merge';
import { cardHoverImage } from '@/lib/card-images';
import { colorToFolder } from '@/lib/colors';
import ProductGridCard from '@/components/ProductGridCard';

export const metadata = {
  title: "The Full Armory · Hollow Ronin",
  description: "Every piece, every drop. The complete Hollow Ronin armory.",
  alternates: { canonical: "/shop/all" },
};

export const revalidate = 3600;

export default async function ShopAllPage() {
  let families = [];
  try {
    families = await getAllFamilies();
  } catch (err) {
    console.error('[shop/all] Shopify fetch failed:', err);
  }

  // Newest-first: Drop 004 → 003 → 002 → 001, then everything else
  const DROP_ORDER = { 'DROP 004': 0, 'CORE': 0, 'DROP 003': 1, 'DROP 002': 2, 'DROP 001': 3 };
  families = [...families].sort((a, b) => {
    const ao = DROP_ORDER[a.label] ?? 99;
    const bo = DROP_ORDER[b.label] ?? 99;
    return ao - bo;
  });

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <section style={{
        padding: 'clamp(96px, 16vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(201,169,97,0.10) 0%, #080808 65%)',
        borderBottom: '1px solid rgba(201,169,97,0.25)',
      }}>
        <p style={{
          margin: '0 0 18px', fontSize: 10, letterSpacing: 8,
          color: '#c9a961', fontFamily: '"Space Mono", monospace',
          textTransform: 'uppercase',
        }}>
          ⟁ &nbsp; THE FULL ARMORY &nbsp; ⟁
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(64px, 9vw, 124px)',
          color: '#f0ede6',
          letterSpacing: '0.14em',
          margin: 0, lineHeight: 1,
          textShadow: '0 0 40px rgba(201,169,97,0.18)',
        }}>
          ALL PIECES
        </h1>
        <p style={{
          marginTop: 22, fontSize: 11, letterSpacing: '0.4em',
          color: '#888', fontFamily: "'Space Mono', monospace",
          textTransform: 'uppercase',
        }}>
          {families.length} Pieces · Every Drop
        </p>
      </section>

      <section style={{ padding: '64px 0 120px' }}>
        <div className="hr-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 64px',
        }}>
          {families.map((family, i) => {
            const isTeeOrHoodie =
              family.category === 'shirts' ||
              family.category === 'tees' ||
              family.category === 'hoodies' ||
              family.category === 'masked-hoodies';

            const colors = family.variants.map((v) => {
              const folderColor = colorToFolder(v.color);
              const defaultUrl = isTeeOrHoodie
                ? `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-back-${folderColor}.png`
                : `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-front-${folderColor}.png`;
              const defaultAlt = isTeeOrHoodie
                ? `${family.name} — back design`
                : `${family.name} — front view`;
              const hover = cardHoverImage({
                imageFolder: family.imageFolder,
                color:       v.color,
                name:        family.name,
                fallback:    { url: defaultUrl, alt: defaultAlt },
              });
              return {
                color:    v.color,
                handle:   v.handle,
                price:    v.price,
                defaultUrl,
                defaultAlt,
                hoverUrl: hover.url,
                hoverAlt: hover.alt,
              };
            });

            const familyInfo = {
              name:         family.name,
              kanji:        family.kanji,
              japaneseName: family.japaneseName,
              label:        family.label,
            };

            return (
              <ProductGridCard
                key={family.designFamily}
                family={familyInfo}
                colors={colors}
                initialColor={family.lead.color}
                animationDelay={`${i * 0.04}s`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 8.4: Add `tees` + `outerwear` to `app/shop/page.jsx` CATEGORIES list**

Open `app/shop/page.jsx`. Find the `CATEGORIES` constant (line 13). Replace it with:

```js
const CATEGORIES = [
  { slug: "tees",           label: "TEES",           kanji: "Tシャツ" },
  { slug: "shirts",         label: "SHIRTS",         kanji: "上着" },
  { slug: "hoodies",        label: "HOODIES",        kanji: "頭巾" },
  { slug: "joggers",        label: "JOGGERS",        kanji: "袴"   },
  { slug: "outerwear",      label: "OUTERWEAR",      kanji: "外套" },
  { slug: "masked-hoodies", label: "MASKED HOODIES", kanji: "面頭巾" },
  { slug: "hats",           label: "HATS",           kanji: "帽子" },
  { slug: "beanies",        label: "BEANIES",        kanji: "毛帽" },
  { slug: "socks",          label: "SOCKS",          kanji: "靴下" },
  { slug: "scarfs",         label: "SCARVES",        kanji: "襟巻" },
];
```

- [ ] **Step 8.5: Build sanity check**

```bash
npm run build 2>&1 | tail -40
```

Expected:
- `✓ Compiled successfully`
- New routes `/shop/tees`, `/shop/outerwear`, `/shop/all` appear in the route table
- Drop 004 product pages `/products/<handle>` appear (generated by the existing `app/products/[slug]/page.tsx` `generateStaticParams`)

- [ ] **Step 8.6: Commit**

```bash
git add app/shop/tees app/shop/outerwear app/shop/all app/shop/page.jsx
git commit -m "feat(drop-004): add /shop/tees, /shop/outerwear, /shop/all routes"
```

---

## Task 9: Color-level OOS rendering — grid card + PDP

**Files:**
- Modify: `components/ProductShellPage.jsx`
- Modify: `components/ProductGridCard.jsx`
- Modify: `components/three/ProductPage.tsx`

The existing per-size OOS works (`.hr-size-btn.is-oos`). New work: full-color OOS — when a color has 0 in-stock sizes, the swatch dot is rendered disabled with strikethrough.

- [ ] **Step 9.1: Compute per-color availability in `ProductShellPage.jsx`**

Open `components/ProductShellPage.jsx`. Find the `colors` derivation inside the `families.map` (around line 424). Replace the `colors` array build with:

```jsx
const colors = family.variants.map((v) => {
  const folderColor = COLOR_FOLDER[v.color] || 'black';
  const defaultUrl = isTeeOrHoodie
    ? `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-back-${folderColor}.png`
    : `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-front-${folderColor}.png`;
  const defaultAlt = isTeeOrHoodie
    ? `${family.name} — back design`
    : `${family.name} — front view`;
  const hover = cardHoverImage({
    imageFolder: family.imageFolder,
    color:       v.color,
    name:        family.name,
    fallback:    { url: defaultUrl, alt: defaultAlt },
  });
  const inStockSizes = v.sizes.filter((s) => s.available).length;
  return {
    color:       v.color,
    handle:      v.handle,
    price:       v.price,
    available:   inStockSizes > 0,           // NEW: false when every size is OOS
    inStockSizes,                            // NEW: count for "limited sizing" pill
    totalSizes:  v.sizes.length,             // NEW
    defaultUrl,
    defaultAlt,
    hoverUrl:    hover.url,
    hoverAlt:    hover.alt,
  };
});
```

Then extend `COLOR_FOLDER` to handle mineral wash slugs:

```jsx
const COLOR_FOLDER = {
  WHITE:            'white',
  PEPPER:           'pepper',
  ESPRESSO:         'espresso',
  IVORY:            'ivory',
  'MINERAL-GREY':   'mineral-grey',
  'MINERAL-BLACK':  'mineral-black',
  'MINERAL-NAVY':   'mineral-navy',
  'MINERAL-PURPLE': 'mineral-purple',
};
```

(Alternative: replace the inline `COLOR_FOLDER` map with `import { colorToFolder } from '@/lib/colors'` and replace each call with `colorToFolder(v.color)`. The plan keeps the local map only because `ProductShellPage` is a server component and the inline form is established in the repo; choose the import if you prefer DRY.)

- [ ] **Step 9.2: Update `ProductGridCard.jsx` SWATCH_HEX to mineral wash + render OOS state**

Open `components/ProductGridCard.jsx`. Replace the `SWATCH_HEX` constant (lines 20–26) with an import:

```jsx
import { SWATCH_HEX } from '@/lib/colors';
```

Then update the swatch button JSX (lines 88–109). Replace with:

```jsx
{colors.map((c) => {
  const isSel = c.color === selected;
  const disabled = c.available === false;
  return (
    <button
      key={c.color}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        setSelected(c.color);
      }}
      className={`hr-swatch${isSel ? ' is-selected' : ''}${disabled ? ' is-oos' : ''}`}
      aria-label={
        disabled
          ? `${c.color.toLowerCase()} — sold out`
          : `Show ${c.color.toLowerCase()} variant`
      }
      aria-disabled={disabled || undefined}
      aria-pressed={isSel}
      title={disabled ? 'Sold out' : undefined}
    >
      <span
        className="hr-swatch-dot"
        style={{ background: SWATCH_HEX[c.color] ?? '#1a1a1a' }}
      />
    </button>
  );
})}
```

Add the OOS class style. In `components/ProductShellPage.jsx` find the `.hr-swatch` CSS block (around line 244 in the `<style>` literal) and append:

```css
.hr-swatch.is-oos {
  cursor: not-allowed;
  opacity: 0.45;
}
.hr-swatch.is-oos .hr-swatch-dot {
  position: relative;
}
.hr-swatch.is-oos .hr-swatch-dot::after {
  content: '';
  position: absolute;
  left: -2px; right: -2px; top: 50%;
  height: 1px;
  background: rgba(244, 237, 226, 0.85);
  transform: rotate(-20deg);
  transform-origin: center;
  pointer-events: none;
}
.hr-swatch.is-oos:hover .hr-swatch-dot {
  transform: none;
  box-shadow: 0 0 0 1px rgba(244, 237, 226, 0.12);
}
```

- [ ] **Step 9.3: Update PDP color swatch OOS state in `components/three/ProductPage.tsx`**

Open `components/three/ProductPage.tsx`. Replace the local `COLOR_SWATCH` (lines 34–40) with an import:

```tsx
import { SWATCH_HEX, colorLabel } from '@/lib/colors'
```

Then in the `ColorPicker` component (lines 246–292), replace the swatch render block:

```tsx
function ColorPicker({
  family,
  activeHandle,
}: {
  family:       EnrichedFamily
  activeHandle: string
}) {
  if (family.variants.length <= 1) return null
  const active = family.variants.find((v) => v.handle === activeHandle) ?? family.variants[0]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          Color
        </p>
        <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          {colorLabel(active.color)}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {family.variants.map((v) => {
          const selected   = v.handle === activeHandle
          const inStockSz  = v.sizes.filter((s) => s.available).length
          const fullyOOS   = inStockSz === 0
          const cn = `hr-pdp-color-sw${selected ? ' is-selected' : ''}${fullyOOS ? ' is-oos' : ''}`
          return (
            <Link
              key={v.handle}
              href={`/products/${v.handle}`}
              aria-label={
                fullyOOS
                  ? `${colorLabel(v.color)} — sold out`
                  : `Color: ${colorLabel(v.color)}`
              }
              aria-current={selected ? 'page' : undefined}
              aria-disabled={fullyOOS || undefined}
              title={fullyOOS ? `${colorLabel(v.color)} — sold out` : colorLabel(v.color)}
              prefetch={false}
              className={cn}
              style={{
                width: 36, height: 36, padding: 0,
                background: SWATCH_HEX[v.color],
                border: `1px solid ${selected ? '#c9a961' : 'rgba(255,255,255,0.15)'}`,
                boxShadow: selected ? '0 0 0 2px rgba(201,169,97,0.30)' : 'none',
                display: 'inline-block',
                position: 'relative',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
                opacity: fullyOOS ? 0.55 : 1,
                cursor: fullyOOS ? 'not-allowed' : 'pointer',
                pointerEvents: fullyOOS ? 'none' : 'auto',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
```

Add the OOS strikethrough style inside the PDP `<style>` literal (the long template literal that starts around line 423). Append before the closing backtick:

```css
.hr-pdp-color-sw.is-oos::after {
  content: '';
  position: absolute;
  left: -2px; right: -2px; top: 50%;
  height: 1px;
  background: rgba(244, 237, 226, 0.85);
  transform: rotate(-20deg);
  transform-origin: center;
  pointer-events: none;
}
```

- [ ] **Step 9.4: Build + dev-server check**

```bash
npm run build 2>&1 | tail -30
```

Expected: clean build.

```bash
npm run dev
```

Browse to `/shop/tees`, hover a Drop 004 card → confirm Black swatch (Mon no Mukō, Karasu-Tengu) shows strikethrough and refuses to swap the active variant.

Click into a Mon no Mukō PDP → confirm the Black color swatch in the PDP color picker shows strikethrough + `not-allowed` cursor + cannot be clicked.

- [ ] **Step 9.5: Commit**

```bash
git add components/ProductGridCard.jsx components/ProductShellPage.jsx components/three/ProductPage.tsx
git commit -m "feat(pdp): color-level OOS swatch rendering — grid card + PDP color picker"
```

---

## Task 10: PDP color-swap shallow routing

**Files:**
- Modify: `components/three/ProductPage.tsx`

Today the `ColorPicker` is built from `<Link href>` per swatch — clicking navigates to a new `/products/<handle>` route and the size selection state resets. We want the size + qty to persist when the user swaps color.

Strategy: lift size + qty into the URL via `router.replace` with `scroll: false`. The PDP's `size` state initializes from `?size=` query param; clicking another color swatch becomes `router.replace('/products/<new-handle>?size=M&qty=2', { scroll: false })`.

- [ ] **Step 10.1: Wire `useRouter` + `useSearchParams`**

In `components/three/ProductPage.tsx`, add at the top of the imports:

```tsx
import { useRouter, useSearchParams } from 'next/navigation'
```

Inside the `ProductPage` default export, after the existing `const { add } = useCart()` line, add:

```tsx
const router       = useRouter()
const searchParams = useSearchParams()
```

- [ ] **Step 10.2: Initialize `size` + `qty` from URL on mount**

Replace the current `useState` initializers:

```tsx
const [size, setSize] = useState<string | null>(null)
const [qty,  setQty]  = useState(1)
```

with:

```tsx
const initialSize = (() => {
  const fromUrl = searchParams?.get('size')?.toUpperCase() ?? null
  if (!fromUrl) return null
  const slot = active.sizes.find((s) => s.size === fromUrl && s.available)
  return slot ? fromUrl : null
})()
const initialQty = Math.max(1, Math.min(99, Number(searchParams?.get('qty') ?? 1) || 1))

const [size, setSize] = useState<string | null>(initialSize)
const [qty,  setQty]  = useState<number>(initialQty)
```

- [ ] **Step 10.3: Push size + qty to URL on change**

Add a single `useEffect` that mirrors local state to the URL:

```tsx
useEffect(() => {
  const params = new URLSearchParams(searchParams?.toString() ?? '')
  if (size) params.set('size', size); else params.delete('size')
  if (qty > 1) params.set('qty', String(qty)); else params.delete('qty')
  const qs = params.toString()
  router.replace(`/products/${active.handle}${qs ? `?${qs}` : ''}`, { scroll: false })
}, [size, qty, active.handle, router, searchParams])
```

- [ ] **Step 10.4: Update the `ColorPicker` to carry size + qty in the swap URL**

In the `ColorPicker` `<Link>` href, replace:

```tsx
href={`/products/${v.handle}`}
```

with:

```tsx
href={(() => {
  const carry: string[] = []
  if (size)   carry.push(`size=${encodeURIComponent(size)}`)
  if (qty > 1) carry.push(`qty=${qty}`)
  return `/products/${v.handle}${carry.length ? `?${carry.join('&')}` : ''}`
})()}
```

Behavior: when the user swaps to a different color, the new PDP loads with `?size=M&qty=2`, the `initialSize` selector validates that the new variant *also* has size M in stock, and either preserves or clears the selection. The `qty` always survives.

- [ ] **Step 10.5: Dev-server check**

Restart dev server. Open Mon no Mukō PDP → pick size M → set qty 3 → click Mineral Navy swatch.

Expected: URL becomes `/products/<navy-handle>?size=M&qty=3`, page hot-loads (no scroll jump), size M is still highlighted, qty shows 3.

If the new variant doesn't carry size M (rare for the same family), `initialSize` falls back to `null` and the customer is prompted to pick a size. That's the correct degraded behavior.

- [ ] **Step 10.6: Commit**

```bash
git add components/three/ProductPage.tsx
git commit -m "feat(pdp): persist size + qty across color swap via shallow routing"
```

---

## Task 11: Mobile sticky CTA edge cases

**Files:**
- Modify: `components/three/ProductPage.tsx`

Spec calls for two edge cases:
1. If selected color has 0 sizes in stock → hide sticky CTA entirely.
2. If selected color has 1–2 sizes in stock → show "limited sizing" pill near size selector.

- [ ] **Step 11.1: Derive availability counts**

Inside `ProductPage`, after `const sizeSlots = canonicalSizes.map(...)`, add:

```tsx
const inStockCount = active.sizes.filter((s) => s.available).length
const fullyOOS     = inStockCount === 0
const limited      = inStockCount > 0 && inStockCount <= 2
```

- [ ] **Step 11.2: Hide sticky CTA when fully OOS**

Find the sticky CTA wrapper (`<div className="hr-mobile-cta" role="region" aria-label="Add to cart">`, around line 755). Wrap it:

```tsx
{!fullyOOS && (
  <div className="hr-mobile-cta" role="region" aria-label="Add to cart">
    {/* ...existing children... */}
  </div>
)}
```

- [ ] **Step 11.3: Show "Limited sizing" pill near size selector**

Find the "Size" row header (around line 628):

```tsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Size</p>
  <button ...>Size Guide ↗</button>
</div>
```

Replace with:

```tsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Size</p>
    {limited && (
      <span style={{
        fontFamily: 'monospace',
        fontSize: 9, letterSpacing: 2,
        padding: '3px 7px',
        color: '#c9a961',
        border: '1px solid rgba(201,169,97,0.55)',
        textTransform: 'uppercase',
        lineHeight: 1.2,
      }}>
        Limited sizing
      </span>
    )}
    {fullyOOS && (
      <span style={{
        fontFamily: 'monospace',
        fontSize: 9, letterSpacing: 2,
        padding: '3px 7px',
        color: 'rgba(244,237,226,0.65)',
        border: '1px solid rgba(244,237,226,0.30)',
        textTransform: 'uppercase',
        lineHeight: 1.2,
      }}>
        Sold out — try another color
      </span>
    )}
  </div>
  <button
    onClick={() => setGuideOpen(true)}
    style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: 9, letterSpacing: 3, color: '#c9a961',
      fontFamily: 'monospace', textTransform: 'uppercase',
      textDecoration: 'underline', textUnderlineOffset: 3,
      padding: 0,
    }}
  >
    Size Guide ↗
  </button>
</div>
```

- [ ] **Step 11.4: Dev-server check**

Restart dev server. Visit a Drop 001 PDP that has a single in-stock size left (or temporarily set Storefront variants to test) → confirm "Limited sizing" pill renders.

Visit the Mon no Mukō Mineral Black variant URL (the OOS color we created in Task 1) directly via `/products/<black-handle>` → confirm the "Sold out — try another color" pill appears, the mobile sticky CTA is hidden, and the desktop Acquire button is disabled (existing behavior).

- [ ] **Step 11.5: Commit**

```bash
git add components/three/ProductPage.tsx
git commit -m "feat(pdp): limited-sizing pill + hide sticky CTA when color fully OOS"
```

---

## Task 12: Sitemap regeneration

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 12.1: Update `STATIC_ROUTES`**

Open `app/sitemap.ts`. Replace the `STATIC_ROUTES` constant (lines 6–17) with:

```ts
const STATIC_ROUTES = [
  '',
  '/shop',
  '/shop/all',
  '/shop/tees',
  '/shop/shirts',
  '/shop/hoodies',
  '/shop/joggers',
  '/shop/outerwear',
  '/lookbook',
  '/about',
  '/drops',
  '/shipping',
  '/returns',
  '/privacy',
  '/terms',
]
```

The dynamic `/products/<handle>` entries are still generated from `getAllHandles()` and will automatically include the 5 new Drop 004 product handles (plus the OOS Black variants from Task 1).

- [ ] **Step 12.2: Verify the sitemap**

```bash
npm run build 2>&1 | tail -40
```

Then locally:

```bash
npm run start
```

Open http://localhost:3000/sitemap.xml. Expected: every new static route + every Drop 004 product handle present, total entry count went up by 5 (new statics) + ~15 (new product handles including OOS Black variants).

- [ ] **Step 12.3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): add /shop/tees, /shop/outerwear, /shop/all + missing categories to sitemap"
```

---

## Task 13: End-to-end verification + final commit

**Files:**
- Browser-only verification, then final consolidating commit if anything was missed

- [ ] **Step 13.1: Full build**

```bash
npm run build 2>&1 | tail -50
```

Expected: `✓ Compiled successfully`. The route table shows every new page.

- [ ] **Step 13.2: Dev-server golden-path walk**

```bash
npm run dev
```

Visit and confirm in browser:

| URL | What to confirm |
|---|---|
| `/shop` | New TEES and OUTERWEAR tiles appear in the category grid, both reading "NOW LIVE" |
| `/shop/tees` | 4 cards (Mon no Mukō, Hone no Chikai, Mu no Kamen, Karasu-Tengu), Mon no Mukō and Karasu-Tengu show Mineral Black swatch with strikethrough |
| `/shop/outerwear` | 1 card (Hyōhaku no Hane), $109, Black swatch only |
| `/shop/all` | All Drop 001 + 002 + 003 + 004 + Hyōhaku families in newest-first order |
| `/products/<mon-no-muko-mineral-purple-handle>` | Hero image loads, Mineral Black swatch strikethrough, click Navy → URL updates with shallow routing |
| `/products/<mon-no-muko-mineral-black-handle>` | Visited directly: "Sold out — try another color" pill, mobile sticky CTA hidden, desktop Acquire button disabled |
| `/products/<hyohaku-no-hane-handle>` | Anorak PDP renders with `outerwear` category breadcrumb |
| `/sitemap.xml` | New static routes + new product handles present |

- [ ] **Step 13.3: Console-log audit**

Open browser devtools console. Walk the same URLs. Expected: no React errors, no missing-image 404s on populated colors (warnings allowed for any Mineral Black mockups the user didn't supply). Any `[card-images] missing front mockup` warning is benign — confirm the fallback renders.

- [ ] **Step 13.4: If verification surfaces fixes, commit them**

If you find any small bug during walk-through, fix and commit as `fix(drop-004): <one-line>`. Do not roll prior commits.

---

## Task 14: Push, deploy, channel-sync audit

**Files:**
- None local; production verification only

- [ ] **Step 14.1: Push every commit from Tasks 4–13**

```bash
git push origin main
```

- [ ] **Step 14.2: Watch Vercel build**

Either run `vercel logs <deployment-url>` or open the Vercel dashboard. Wait for green deploy.

- [ ] **Step 14.3: Bust the Storefront ISR cache**

The 1-hour `next.revalidate` means freshly-set metafields may not appear immediately on production. Force a fresh ISR with an empty commit (mirrors the pattern from `2026-05-16-drop-003`):

```bash
git commit --allow-empty -m "chore: rebuild after drop-004 metafields published"
git push origin main
```

Wait for the second deploy.

- [ ] **Step 14.4: Production audit — re-run the verification matrix from Step 13.2 against hollowronin.com**

Walk every URL on production. Expected results identical to local dev.

- [ ] **Step 14.5: Run Shopify channel-sync parity check**

```graphql
query Drop004Audit {
  products(first: 20, query: "vendor:'Hollow Ronin' status:active created_at:>2026-05-15") {
    edges {
      node {
        id
        handle
        title
        publishedOnCurrentPublication
        totalInventory
        designFamily:   metafield(namespace: "custom", key: "design_family")    { value }
        collectionDrop: metafield(namespace: "custom", key: "collection_drop")  { value }
        productCategory:metafield(namespace: "custom", key: "product_category") { value }
        variants(first: 50) {
          edges {
            node {
              id
              title
              inventoryQuantity
              inventoryPolicy
              inventoryItem { tracked }
              availableForSale
            }
          }
        }
      }
    }
  }
}
```

Confirm in the response:
- All 5 products: `publishedOnCurrentPublication: true`
- All 5 products: `designFamily.value` populated
- 4 tees: `collectionDrop.value: "drop-004-tees"`
- Anorak: `productCategory.value: "outerwear"`
- Mineral Black variants (Mon no Mukō, Karasu-Tengu): `inventoryItem.tracked: true`, `inventoryQuantity: 0`, `inventoryPolicy: DENY`, `availableForSale: false`
- Every other variant: `availableForSale: true`

- [ ] **Step 14.6: Final consolidating commit message — paste audit results**

If there were no follow-up fixes in Task 13 / 14, the spec's requested commit message already lives across the prior individual commits. If you want to amend the *push* with a milestone-tag commit, run:

```bash
git commit --allow-empty -m "$(cat <<'EOF'
feat(drop-004): launch Weathered Exile tees + Hyōhaku no Hane anorak — MILESTONE

- Add Mon no Mukō, Hone no Chikai, Mu no Kamen, Karasu-Tengu tees
  ($59, Colortone 1300 Mineral Wash)
- Add Hyōhaku no Hane packable anorak ($109, Champion 1720TU)
- New /shop/tees, /shop/outerwear, /shop/all routes
- New lib/colors.ts as single source of truth (consolidates SWATCH_HEX,
  colorToFolder, normalizeColor that were duplicated in 4 files)
- Brand rule update: purple permitted across all clans (stock-driven)
- Backfill OOS Mineral Black variants for Mon no Mukō + Karasu-Tengu
  via Admin GraphQL (productVariantsBulkCreate)
- PDP color-swap shallow routing — size + qty persist via URL
- Color-level OOS rendering — grid card + PDP color picker
- Mobile sticky CTA edge cases — hide when color fully OOS,
  "Limited sizing" pill when 1-2 sizes in stock
- Regenerated sitemap with 4 new static routes + new product handles
- Channel-sync audit: 5/5 products published to Headless, metafields verified,
  inventory tracking confirmed
EOF
)"
git push origin main
```

---

## Self-Review Checklist

Run this yourself before declaring done.

### Spec coverage
- [ ] Spec §1 (Admin GraphQL Black variants) → Task 1
- [ ] Spec §2 (lib/colors.ts) → Task 4
- [ ] Spec §3 (Editorial config 4 tees + 1 anorak) → Task 6
- [ ] Spec §4 (Variant-level OOS rendering) → Task 9 (color-level new), per-size OOS already exists
- [ ] Spec §5 (New routes /shop/tees, /shop/outerwear, /shop/all) → Task 8
- [ ] Spec §6 (Metafields read) → Task 2 (write), `lib/shopify-products.ts` already reads `custom.design_family` + `custom.color`. `custom.collection_drop` and `custom.product_category` are written but not read by any code path today — flag for follow-up: if filtering by collection_drop becomes needed, extend `PRODUCT_FIELDS` in `lib/shopify-products.ts`.
- [ ] Spec §7 (PDP color-swap shallow routing) → Task 10
- [ ] Spec §8 (Mobile sticky CTA edge case) → Task 11
- [ ] Spec §9 (Sitemap regeneration) → Task 12
- [ ] Spec §10 (Channel-sync audit) → Task 14.5
- [ ] Spec §11 (Commit message) → Task 14.6
- [ ] Spec mockup upload list → Task 7
- [ ] Spec brand rule (purple permitted) → Task 4 (palette comment in `lib/colors.ts`)

### Placeholder scan
- [ ] No TODO / TBD / "implement later" in plan body
- [ ] Every step has runnable code or shell command
- [ ] No "similar to Task N" handwaves

### Type consistency
- [ ] `ColorSlug` extended in Task 4.1, re-exported in 4.2, consumed in 4.3, 5.2, 8.3, 9.2, 9.3 — all reference the same union
- [ ] `Category` extended in 5.1, consumed in 5.4, 6.1, 8.1–8.4 — all routes resolve to a member of the extended union
- [ ] `SWATCH_HEX` defined in `lib/colors.ts` Task 4.1, imported in Tasks 8.3, 9.2, 9.3 — single source
- [ ] `colorToFolder` defined in Task 4.1, consumed in Task 4.3 + Task 8.3 — single source
- [ ] `normalizeColor` defined in Task 4.1, consumed indirectly via the re-export through `lib/shopify-products.ts:normalize` (Task 4.2)
- [ ] `colorLabel` defined in Task 4.1, consumed in Task 9.3 PDP color picker

### Open follow-ups (not blocking Drop 004 launch)
- [ ] If we later want to filter the `/shop/tees` page by `collection_drop` instead of `category`, extend `PRODUCT_FIELDS` in `lib/shopify-products.ts` to fetch the metafield and add an optional filter param to `getFamiliesByCategory`. Today the page filters by `category: 'tees'` which is sufficient.
- [ ] If variant-level `custom.color` becomes the canonical source (instead of product-level), `lib/shopify-products.ts:normalize` needs to read color from `node.variants.edges[0].metafield` rather than `node.color`. Currently both are written in Task 2 for forward compatibility; the code path still uses product-level.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-05-17-drop-004-weathered-exile.md`.

Two execution options:

**1. Inline Execution (recommended)** — Most of the work is Shopify MCP calls (Tasks 1–3, 14.5) + targeted code edits. A fresh subagent per task would have to re-derive the live Shopify GID context every time. Execute inline using `superpowers:executing-plans`, with natural checkpoints after Tasks 3, 7, 11, 13, and 14.

**2. Subagent-Driven** — Viable for Tasks 4–12 (pure code work) but each subagent would need the prior task's commit hash + the live Shopify GID map re-passed in its prompt. Higher overhead, useful if you want independent code-review checkpoints between tasks.

Which approach?
