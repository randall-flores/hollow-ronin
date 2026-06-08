# Hollow Ronin

> Headless streetwear storefront for a Japanese-mythology apparel label. No master. No rules.

## Overview

Hollow Ronin is a production e-commerce storefront for a limited-run streetwear brand built around AI-generated Japanese-mythology artwork. It solves the cost and overhead problem of independent apparel: there is no inventory and no warehouse, because every order is printed on demand and fulfilled automatically. The site pairs a fully headless Shopify checkout with an in-repo editorial layer, so commerce data and brand storytelling stay cleanly separated while rendering as one catalog.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Language:** TypeScript 5
- **UI:** React 19, Tailwind CSS v4, Framer Motion
- **Commerce:** Shopify Storefront GraphQL API (headless)
- **Fulfillment:** Printify (print-on-demand, DTG)
- **Auth & Data:** Supabase (Postgres, Auth, Row-Level Security) via `@supabase/ssr`
- **Email:** Resend (newsletter audience capture)
- **Media:** `yet-another-react-lightbox` for product galleries
- **Hosting:** Vercel

## Key Features

- Headless Shopify catalog with server-side cart creation and hosted checkout handoff
- Editorial "design family" model that joins lore, clans, and artwork to live Shopify products
- Per-color product variants with synthetic handles, resilient to multi-color drops
- Timed drop mechanics with a live countdown and a "live now" state
- Account area with email/password and Google OAuth, password recovery, and a profile dashboard
- Newsletter capture wired to a Resend audience
- Fail-soft catalog: placeholder families render even when the commerce API is unavailable
- SEO surface with generated `sitemap.ts`, `robots.ts`, and Open Graph imagery

## Tech Highlights

- **Headless Shopify plus Printify pipeline.** Artwork is generated, mocked up, and synced to Printify for on-demand production, then surfaced through the Shopify Storefront API. The app talks only to the Storefront GraphQL endpoint for variant resolution and `cartCreate`, keeping the React tier stateless and the checkout PCI burden on Shopify.
- **Editorial merge layer.** Commerce data (price, variants, availability) lives in Shopify while story, clan, and accent data live in the repo. The two are joined at request time by the `custom.design_family` metafield, with multi-color Shopify products split into per-color entries so the family model stays uniform across drops.
- **Drop mechanics.** A single `NEXT_PUBLIC_DROP_END_AT` timestamp drives a client countdown that flips between "closes in" and "live now," giving the release its scarcity without any server scheduling.
- **Supabase auth with Row-Level Security.** Sessions are refreshed in Next.js middleware on every request using the SSR client. The `profiles` table is locked down with owner-scoped RLS policies (`auth.uid() = id` on select, insert, and update), and the signup trigger function is restricted so it cannot be invoked directly over the REST API.

## Running Locally

Requires Node 20 or newer.

```bash
npm install
npm run dev      # start the dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Create a `.env.local` with the following keys. Use your own values; never commit this file.

```bash
# Shopify Storefront (public, browser-exposed)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token

# Supabase (anon key is public by design; protected by RLS)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_anon_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DROP_END_AT=2026-12-31T00:00:00Z

# Newsletter (server-only, optional in dev)
RESEND_API_KEY=your_resend_api_key
RESEND_AUDIENCE_ID=your_resend_audience_id
```

The catalog is fail-soft: with no Shopify credentials the app still boots and renders placeholder families, so you can develop UI without live commerce keys.

## Links

- **Live store:** _TBD_
- **Case study:** https://randall-portfolio-six.vercel.app/work/hollow-ronin
