# Signed-in /account Dashboard — Design Spec

**Date:** 2026-05-21
**Status:** Approved design, pending spec review → implementation plan

## Goal

Build the signed-in `/account` experience: an **Overview** dashboard and an editable **Profile** section, plus a full sidebar nav where the remaining sections render tasteful "Coming soon" placeholders. Match the existing `/account` auth aesthetic exactly.

## Context (existing, verified)

- `app/account/page.tsx` — server component. Auth gate via `supabase.auth.getUser()`. Renders `SignedOutView` (untouched: form + Google button) or, currently, a minimal `SignedInView` (email + Sign Out) inside a `max-w-[480px]` centered `<article>`.
- `lib/supabase/server.ts` → `createClient()` (server, cookie-based, RLS). `lib/supabase/client.ts` → `createClient()` (browser).
- `app/account/auth-alert.tsx` → `AuthAlert({ error?, message? })`: `error` → `role="alert"` (blood), `message` → `role="status"` (gold). **Reused** for Profile save feedback.
- `app/account/reset/page.tsx` → session-gated password update; redirects to `/account/recover` only when **no** user. A normal signed-in session passes → valid "Change Password" target.
- `app/account/actions.ts` → `logout` server action (used by Sign Out).
- Tokens (`tailwind.config.ts`): `obsidian #0a0a0a`, `bone #f4ede2`, `blood #a1182a`, `gold #c9a961`, `gold-dim #a88b45`; fonts `font-bebas`, `font-mono`; animation `animate-fade-up`; `app/globals.css` utilities `delay-1..delay-5`.
- No generated Supabase `Database` types — the profile row is hand-typed.
- `profiles` table (exists, RLS read/update own row, trigger auto-creates row on signup): `id, display_name, clan, phone, birthday, created_at, updated_at`.

## Decisions (locked)

1. **Routing:** deep-linkable `?section=`. Single `/account` page; nav items are `<Link href="/account?section=…">`. Active section derived server-side from `searchParams`. Refresh/bookmark/back preserve the section.
2. **Mobile nav (375px):** desktop = left vertical rail; mobile = accessible `<select>` that `router.push`es on change.
3. **Profile data:** server-fetched once and passed as initial props (no client fetch flash). Save uses the browser client. States: saving / success / error; loading is a guard only for an unexpectedly-missing row.

## Architecture

```
/account?section=<section>            (server page: auth + fetch profile row)
  ├─ not signed in → SignedOutView    (UNCHANGED — form + Google button)
  └─ signed in     → <AccountDashboard user profile section>
        Header: <InitialAvatar> + display name / email
        Grid (desktop 2-col, mobile 1-col):
          ├─ <AccountNav active=section>      (client: rail + mobile select)
          └─ section pane:
               overview  → <OverviewSection user profile>      (server)
               profile   → <ProfileSection userId email profile> (client)
               others    → <PlaceholderSection label>          (server)
```

Section switching is server navigation (each nav Link reloads the server page with a new `?section=`), so only the mobile `<select>` and the Profile form need `'use client'`.

## Files

| File | Kind | Responsibility |
|------|------|----------------|
| `app/account/page.tsx` | modify (server) | Extend `searchParams` to `{ error?, message?, section? }`. When signed in: fetch the profile row via the server client, render `<AccountDashboard>` in a wider, left-aligned container (instead of the narrow centered article). Signed-out branch untouched. |
| `app/account/account-dashboard.tsx` | new (server) | Validate `section` against the allowed list (default `overview`). Render header (avatar + name) and the 2-col grid: `<AccountNav>` + the active section component. |
| `app/account/account-nav.tsx` | new (client) | `NAV_ITEMS` list. Desktop: vertical rail of `<Link>`s with active highlight + a lock glyph on locked items. Mobile: `<select>` (sr-only label) whose `onChange` does `router.push('/account?section=' + value)`. Active state from the `section` prop. |
| `app/account/overview-section.tsx` | new (server) | Welcome (display_name or email local-part); Member since (`Intl.DateTimeFormat('en-GB', { day:'numeric', month:'long', year:'numeric' })` on `user.created_at`); Sign-in method (`user.app_metadata.provider === 'google'` ? "Google" : "Email"); Quick actions: Change Password → `/account/reset`, Sign Out (`logout` action form). |
| `app/account/profile-section.tsx` | new (client) | Editable form (see below). Browser-client update with `updated_at`. States via `AuthAlert`. |
| `app/account/placeholder-section.tsx` | new (server) | Quiet locked empty state. Props: `label`. Hairline frame + small inline lock SVG + label + "Coming soon" (mono). Never an error/broken link. |
| `app/account/initial-avatar.tsx` | new (server) | Props: `name`. Circle (bone/gold hairline) with the uppercased first character of the display name, else email. |
| `app/account/auth-alert.tsx` | reuse | Profile success/error feedback. |

## Nav model

`NAV_ITEMS = [{ id, label, live }]` in this order, all rendered:

| id | label | live |
|----|-------|------|
| `overview` | Overview | ✅ |
| `profile` | Profile | ✅ |
| `orders` | Orders | 🔒 |
| `addresses` | Addresses | 🔒 |
| `wishlist` | Wishlist | 🔒 |
| `preferences` | Preferences | 🔒 |
| `security` | Security | 🔒 |
| `armory` | Armory | 🔒 |

Allowed section ids = the `id`s above. Unknown/missing `section` → `overview`. Locked items are still navigable (`?section=orders` renders `<PlaceholderSection label="Orders">`).

## Profile section detail

**Type (hand-written):**
```ts
type ClanValue = 'ronin' | 'akatsuki' | 'yami' | 'kage'
type Profile = {
  display_name: string | null
  clan: ClanValue | null
  phone: string | null
  birthday: string | null // YYYY-MM-DD
}
```

**Fields:**
- **Display name** — text, optional. Existing input treatment.
- **Clan affiliation** — `<select>`: `— Unaffiliated —` (value `''` → saved as `null`), `Ronin`→`ronin`, `Akatsuki-Gumi`→`akatsuki`, `Yami-Gumi`→`yami`, `Kage-Gumi`→`kage`. Styled to match inputs; `<label>` associated.
- **Phone** — `type="tel"`, optional.
- **Birthday** — `type="date"`, optional; value formatted `YYYY-MM-DD`.
- **Email** — read-only disabled input showing `email`. (Email change is a later task — not built.)

**Save:**
```ts
const supabase = createClient() // browser
const { error } = await supabase
  .from('profiles')
  .update({
    display_name: displayName || null,
    clan: clan || null,
    phone: phone || null,
    birthday: birthday || null,
    updated_at: new Date().toISOString(),
  })
  .eq('id', userId)
```
- Wrapped in try/catch (consistent with the Google button) so a thrown error can't strand the saving state.
- **saving:** submit button disabled + spinner/"Saving…".
- **success:** `<AuthAlert message="Profile updated" />` (role=status).
- **error:** `<AuthAlert error={message} />` (role=alert).
- **loading guard:** if the server passed `profile === null` (row absent despite the trigger), show a brief "Summoning your record…" line and an empty form that still saves (update by `id`).

**Initial state:** seeded from the `profile` prop (server-fetched). No `useEffect` fetch.

## Design language

- Palette: obsidian / bone / blood / gold(+gold-dim) only. Primary CTA gold (`bg-[#c9a961] hover:bg-[#a88b45]`), Sign Out / secondary = obsidian + hairline `border-bone/30`.
- Headlines `font-bebas` uppercase with the existing letter-spacing; meta/labels `font-mono` uppercase small.
- Inputs: existing treatment (`min-h-[56px]`, `bg-bone/[0.03]`, `border-bone/[0.15]`, `caret-blood`, blood focus border + ring).
- Focus: `focus-visible:ring-2 focus-visible:ring-blood ring-offset-2 ring-offset-obsidian` everywhere interactive.
- Entrance: `animate-fade-up` with staggered `delay-*`.
- No decorative imagery. The lock glyph is functional UI iconography (inline SVG), not imagery.
- A11y: every input has an associated `<label>` (visible or `sr-only`); the mobile nav `<select>` has an `sr-only` label; avatar is decorative (`aria-hidden`) since the name is shown as text; placeholders use plain text.
- Mobile composed at 375px: single column, `<select>` nav, full-width controls, 56px touch targets.

## Constraints

- Do **not** touch: `SignedOutView` / the Google button, `app/account/recover/`, `app/account/reset/`, `app/account/actions.ts`, env vars, `lib/supabase/server.ts`.
- Do **not** build logic for Orders/Addresses/Wishlist/Preferences/Security/Armory — placeholders only.
- One squashed commit, clear message. Show the `page.tsx` diff (structural container change) before pushing.

## Out of scope (YAGNI)

Avatar upload, email change, and any of the six locked sections' real functionality. Not built this round.
