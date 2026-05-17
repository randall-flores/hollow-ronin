# Drop 003 Shopify Metafields + Color Swatch Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix production `/shop/joggers` — broken hero images and missing color swatches — by setting the missing Shopify metafields on the 12 jogger products and removing one duplicate.

**Architecture:** The code path is already correct. The Storefront API returns 12 jogger products but every one has `customDesignFamily=null` and `customColor=null`, so `lib/shopify-products.ts#normalize()` returns `null` for each → all 12 are dropped → product-merge.ts falls back to `pendingShopify` placeholder variants (one `BLACK` placeholder per design) → ProductShellPage renders one card per family with `lead.color = 'BLACK'` → image path resolves to `/mockups/sweatpant-{slug}/black/...` which does not exist (mockups live in `pepper/espresso/ivory/` subfolders). Fixing this is a **data fix**, not a code fix.

**Tech Stack:** Shopify Admin GraphQL (`metafieldsSet`, `productDelete`) via the `mcp__claude_ai_Shopify__graphql_mutation` MCP tool. Local Next.js dev server for verification.

---

## File Structure

This plan is data-first. No app code is modified except one optional polish edit:

| Path | Role | Action |
|------|------|--------|
| Shopify products (12 jogger GIDs) | Live data | Add `custom.design_family` + `custom.color` metafields |
| Shopify product `15563677303153` | Duplicate Kurokitsune Espresso | Delete (handle `kurokitsune-espresso-sweatpants-1`) |
| `lib/products.ts` | Editorial registry | Once metafields are live and Storefront returns real products, drop the four `pendingShopify: true` flags so synthesized BLACK placeholders stop hiding real variants. |
| Local verification | Build + dev server | `npm run build` then `/shop/joggers` and `/products/mon-no-muko-pepper-sweatpants` spot check |

---

## Task 1: Inventory current Shopify state

**Files:**
- Read-only: Shopify Admin API

- [ ] **Step 1.1: Query all jogger products + metafields**

Use the Shopify MCP tool `mcp__claude_ai_Shopify__graphql_query` with this query to get all 12 jogger products plus the duplicate:

```graphql
query JoggersWithMetafields {
  products(first: 20, query: "product_type:Trousers status:active") {
    edges {
      node {
        id
        handle
        title
        designFamily: metafield(namespace: "custom", key: "design_family") { value }
        color:        metafield(namespace: "custom", key: "color")         { value }
      }
    }
  }
}
```

Expected: 13 nodes (12 joggers + 1 duplicate). Every `designFamily` and `color` should be `null`.

- [ ] **Step 1.2: Build the (gid → designFamily slug + color slug) map**

Map the title pattern `{Design} — {Color} Sweatpants` to:

| Title prefix | designFamily slug |
|---|---|
| `Mon no Mukō` | `sweatpant-mon-no-muko` |
| `Ryūjin` | `sweatpant-ryujin` |
| `Akuma no Ikari` | `sweatpant-akuma-no-ikari` |
| `Kurokitsune` | `sweatpant-kurokitsune` |

| Title color word | color slug (must be uppercase, matches `lib/shopify-products.ts:normalizeColor`) |
|---|---|
| `Pepper` | `PEPPER` |
| `Espresso` | `ESPRESSO` |
| `Ivory` | `IVORY` |

---

## Task 2: Delete the duplicate Kurokitsune Espresso product

**Files:**
- Mutation: Shopify product GID `gid://shopify/Product/15563677303153` (handle `kurokitsune-espresso-sweatpants-1`)

- [ ] **Step 2.1: Confirm the duplicate is the newer one (the `-1` suffix)**

From Task 1 results, look for two products whose handle starts with `kurokitsune-espresso-sweatpants`. Confirm GID `15563677303153` has the `-1` handle suffix — that one is the duplicate.

- [ ] **Step 2.2: Delete the duplicate**

```graphql
mutation Delete($input: ProductDeleteInput!) {
  productDelete(input: $input) {
    deletedProductId
    userErrors { field message }
  }
}
```

Variables:
```json
{ "input": { "id": "gid://shopify/Product/15563677303153" } }
```

Expected: `deletedProductId` returned, no `userErrors`. After delete, only 12 jogger products remain.

- [ ] **Step 2.3: Commit nothing yet — this is a Shopify-side change**

No local file changes from this step. Move on.

---

## Task 3: Set `custom.design_family` + `custom.color` on all 12 joggers

**Files:**
- Mutation: 12 product GIDs

- [ ] **Step 3.1: Build the metafieldsSet payload**

`metafieldsSet` takes up to 25 metafields per call. We need 24 entries (12 products × 2 metafields). One batch is enough.

```graphql
mutation SetJoggerMetafields($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields { id namespace key value ownerType }
    userErrors { field message code }
  }
}
```

Variables (use the actual GIDs returned from Task 1; the GIDs below come from the search results captured during planning and are correct as of plan-write time):

```json
{
  "metafields": [
    { "ownerId": "gid://shopify/Product/15563677729137", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-mon-no-muko" },
    { "ownerId": "gid://shopify/Product/15563677729137", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "PEPPER" },

    { "ownerId": "gid://shopify/Product/15563677696369", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-mon-no-muko" },
    { "ownerId": "gid://shopify/Product/15563677696369", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "ESPRESSO" },

    { "ownerId": "gid://shopify/Product/15563677663601", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-mon-no-muko" },
    { "ownerId": "gid://shopify/Product/15563677663601", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "IVORY" },

    { "ownerId": "gid://shopify/Product/15563677630833", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-ryujin" },
    { "ownerId": "gid://shopify/Product/15563677630833", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "IVORY" },

    { "ownerId": "gid://shopify/Product/15563677598065", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-ryujin" },
    { "ownerId": "gid://shopify/Product/15563677598065", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "ESPRESSO" },

    { "ownerId": "gid://shopify/Product/15563677565297", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-ryujin" },
    { "ownerId": "gid://shopify/Product/15563677565297", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "PEPPER" },

    { "ownerId": "gid://shopify/Product/15563677532529", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-akuma-no-ikari" },
    { "ownerId": "gid://shopify/Product/15563677532529", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "ESPRESSO" },

    { "ownerId": "gid://shopify/Product/15563677466993", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-akuma-no-ikari" },
    { "ownerId": "gid://shopify/Product/15563677466993", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "PEPPER" },

    { "ownerId": "gid://shopify/Product/15563677368689", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-akuma-no-ikari" },
    { "ownerId": "gid://shopify/Product/15563677368689", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "IVORY" },

    { "ownerId": "gid://shopify/Product/15563677335921", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-kurokitsune" },
    { "ownerId": "gid://shopify/Product/15563677335921", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "PEPPER" },

    { "ownerId": "gid://shopify/Product/15563677270385", "namespace": "custom", "key": "design_family", "type": "single_line_text_field", "value": "sweatpant-kurokitsune" },
    { "ownerId": "gid://shopify/Product/15563677270385", "namespace": "custom", "key": "color",         "type": "single_line_text_field", "value": "IVORY" }
  ]
}
```

Note: this is 22 metafields covering 11 products. The 12th product is the **surviving** Kurokitsune Espresso. After the duplicate is deleted in Task 2, find the remaining Kurokitsune Espresso GID (the one without the `-1` handle suffix). The search results showed `gid://shopify/Product/15563677270385` as `kurokitsune-espresso-sweatpants` BUT its variants list above contains Ivory variants — that's likely a swap. **Confirm by re-running Task 1's query AFTER Task 2 deletes the duplicate**, then add the missing 2-metafield pair for the surviving Kurokitsune Espresso product. Do not guess the GID from the captured search results — they show inventory rows that don't match the handle and may indicate a different mapping.

- [ ] **Step 3.2: Execute the mutation**

Use `mcp__claude_ai_Shopify__graphql_mutation`. Expected: 22 (or 24 if Kurokitsune Espresso is included from the start) `metafields` returned with their new IDs. `userErrors` must be empty.

- [ ] **Step 3.3: Verify with the same query from Task 1**

Re-run the Task 1 query. Every product should now show `designFamily.value` and `color.value` populated.

- [ ] **Step 3.4: Commit nothing yet — Shopify-side change**

---

## Task 4: Bust the Storefront API cache

**Files:**
- Local: `lib/shopify-products.ts` (read-only inspection)

The Storefront API requests in `lib/shopify-products.ts` use `next: { revalidate: 3600, tags: ['shopify-products'] }`. The 1-hour cache means metafield writes won't be visible on `/shop/joggers` for up to 60 minutes unless we revalidate.

- [ ] **Step 4.1: Trigger a Vercel rebuild**

Either:
- Push an empty commit (already a pattern in this repo: see commit `a8a5a7d` titled `chore: trigger rebuild after Shopify headless channel publish`), OR
- Use the Vercel dashboard to redeploy main.

```bash
git commit --allow-empty -m "chore: rebuild after drop-003 metafields published"
git push origin main
```

- [ ] **Step 4.2: Wait for the production deploy to finish**

Watch Vercel for the deploy to go green. The new fetch will pick up the metafields on the next ISR refresh.

---

## Task 5: Remove `pendingShopify` placeholders for the four jogger families

**Files:**
- Modify: `lib/products.ts` — the four entries `sweatpant-mon-no-muko`, `sweatpant-ryujin`, `sweatpant-akuma-no-ikari`, `sweatpant-kurokitsune`.

These flags exist so the page renders before Shopify is wired. Once metafields are set and the Storefront API returns the 12 real products, the placeholder synthesis in `lib/product-merge.ts:synthesizePlaceholder` should be skipped. `buildFamilies` already skips synthesizing if any real Shopify product matches the family, so leaving `pendingShopify: true` is functionally harmless once data is live — but it adds noise and would re-activate the broken behavior if Shopify went down. Remove it.

- [ ] **Step 5.1: Edit `lib/products.ts`**

For each of the four jogger entries, delete these two lines:

```ts
    pendingShopify:   true,
    placeholderPrice: 75,
```

So an entry that ends with:

```ts
    category:     'joggers',
    imageFolder:  'sweatpant-mon-no-muko',
    pendingShopify:   true,
    placeholderPrice: 75,
  },
```

becomes:

```ts
    category:     'joggers',
    imageFolder:  'sweatpant-mon-no-muko',
  },
```

Apply the same edit to `sweatpant-ryujin`, `sweatpant-akuma-no-ikari`, `sweatpant-kurokitsune`.

- [ ] **Step 5.2: Run the build**

```bash
npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully`. `/shop/joggers` appears in the route table. No new TypeScript errors.

- [ ] **Step 5.3: Commit**

```bash
git add lib/products.ts
git commit -m "fix(drop-003): drop pendingShopify flags now that joggers are wired"
git push origin main
```

---

## Task 6: Spot-check production

**Files:**
- Browser only

- [ ] **Step 6.1: Hard-reload `/shop/joggers`**

Expected:
- 4 cards (Mon no Mukō, Ryūjin, Akuma no Ikari, Kurokitsune) — not 12.
- Each card has a hero image (no broken-image icon).
- Each card shows **3 color dots** below the price (Pepper `#4a4a4a`, Espresso `#3d2817`, Ivory `#f4ede2`). The lead (highlighted) dot should be the one matched by `pickLead` priority — for joggers with no BLACK variant, that is `PEPPER`.
- The "BLACK" badge in the bottom-right corner of the image should now read the lead color (e.g. `PEPPER`) — this was wired in the prior commit `835e0cd`.

If the cards still show only `BLACK` chips or a single dot, the Storefront ISR cache has not refreshed. Wait 5 minutes or re-run Task 4.

- [ ] **Step 6.2: Click into one PDP, e.g. `/products/mon-no-muko-pepper-sweatpants`**

Expected:
- Title `MON NO MUKŌ JOGGERS` (or whatever the Shopify product `title` resolves to — note that `family.name` is the editorial display name and overrides the Shopify title in the H1 per `components/three/ProductPage.tsx:578`).
- Description paragraph (lighter grey, non-italic) sits between the subtitle and the italic story.
- Price `$75.00`.
- Color swatch picker shows three swatches — the active one ringed in gold (`#c9a961`).
- Clicking another swatch updates the active variant (handle changes in the URL or in the cart context — verify by inspecting the page state).

- [ ] **Step 6.3: Add to cart, verify variant ID resolves**

Add a Pepper / size M to cart, switch to Ivory, add again. Cart should have two distinct line items (different variant GIDs).

---

## Self-Review Checklist

Run this yourself before declaring done.

- [ ] **Spec coverage:**
  - Bug 1 (broken mockups) → root cause was missing metafields, fixed by Task 3.
  - Bug 2 (no swatches) → same root cause: with no metafields, all variants collapse to one placeholder; once metafields exist, three real variants per family render three dots.
  - Duplicate Kurokitsune product → Task 2.
  - Code churn (Option A vs B from spec) → neither was needed. Code was correct.

- [ ] **Placeholder scan:** no `TODO`, `TBD`, or "implement later" strings.

- [ ] **GID consistency:** the 11 product GIDs in Task 3 came from the live Shopify search captured during planning. They MUST be re-verified in Task 1 before submitting the mutation. Plus the 12th (surviving Kurokitsune Espresso) is intentionally deferred — it can only be identified after Task 2 deletes the duplicate.

- [ ] **Color-slug values match `normalizeColor`:** the function returns uppercase keys (`PEPPER`, `ESPRESSO`, `IVORY`). The metafield values written in Task 3 are also uppercase. Match confirmed.

- [ ] **Verification still needs the deployed site:** Step 6 cannot be done locally because the local dev environment lacks the Shopify env vars (`[product-merge] Shopify fetch failed — falling back to placeholders only` is the standing local behavior). Run Step 6 against the production URL after the rebuild in Task 4 completes.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-05-16-drop-003-shopify-metafields.md`.

Two execution paths:

1. **Inline (recommended for this plan)** — most of the work is MCP calls to Shopify plus one tiny code edit. Tasks 1–4 are mechanical, Task 5 is one search-replace, Task 6 needs user-driven browser verification. A fresh subagent per task would lose the live Shopify GID context.

2. **Subagent-driven** — viable but extra overhead. Each subagent task would need the full GID map re-passed in its prompt.
