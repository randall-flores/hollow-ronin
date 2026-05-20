# Password Recovery Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the deprecated `/account/recover` stub with a real two-page password recovery flow (`/account/recover` request link + `/account/reset` set new password), aesthetically locked to the `/account` signed-out moment.

**Architecture:** Two Next.js App Router pages, each backed by its own `actions.ts` server action file. Recover flow uses `supabase.auth.resetPasswordForEmail` with `redirectTo` pointing through the existing `/auth/callback` (which exchanges the recovery code for a session, then forwards to `/account/reset`). Reset page verifies the live session server-side, then calls `supabase.auth.updateUser({ password })`. Always show success on the recover page regardless of whether the email is registered (prevent enumeration). No new tests — the project ships with no test runner; verification is `npx tsc --noEmit`, `npm run build`, and manual browser flow.

**Tech Stack:** Next.js 16 App Router, React 19, Server Actions, `@supabase/ssr` 0.10, Tailwind v4 (in-line styles for brand tokens), TypeScript 5.

**Project notes:**
- No test suite. No `lint` script. Verification = type-check + production build + manual browser.
- Aesthetic reference: `app/account/page.tsx` lines 100-161 (the `SignedOutView` — Badge / Bebas headline / Georgia italic tagline / hairline divider / form / footer link row).
- Callback already handles `?next=/account/reset` safely (see `app/auth/callback/route.ts:9` open-redirect guard). No callback changes expected.
- Server-action pattern reference: `app/account/actions.ts` (login/signup/logout).

---

## File Structure

| Path | Action | Responsibility |
|------|--------|----------------|
| `app/account/recover/page.tsx` | Rewrite (full replace) | Email-entry form + success-confirmation view, driven by `searchParams`. |
| `app/account/recover/actions.ts` | Create | Server action `requestReset` — calls `resetPasswordForEmail`, always redirects to success state. |
| `app/account/reset/page.tsx` | Create | Session-gated new-password form. |
| `app/account/reset/actions.ts` | Create | Server action `updatePassword` — validates, calls `updateUser({ password })`, redirects signed-in to `/account`. |
| `app/auth/callback/route.ts` | Read-only verify | Confirm `?next` param still validated. No edits. |

Both pages reuse the same primitives inline (Badge / Divider / FooterLink patterns from `app/account/page.tsx`). Do **not** extract shared components in this pass — YAGNI; the three pages are small, and premature abstraction breaks the visual lock-in. If duplication grows in a future drop, then extract.

---

## Task 1: Recover server action — `requestReset`

**Files:**
- Create: `app/account/recover/actions.ts`

- [ ] **Step 1: Write `requestReset`**

Create `app/account/recover/actions.ts` with:

```ts
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requestReset(formData: FormData) {
  const email = (formData.get('email') as string | null)?.trim()

  if (!email) {
    redirect('/account/recover?error=Email required')
  }

  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hollowronin.com'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/account/reset`,
  })

  if (error) {
    redirect(`/account/recover?error=${encodeURIComponent(error.message)}`)
  }

  // Always show success — never leak whether the email is registered (prevents account enumeration).
  redirect(`/account/recover?sent=true&email=${encodeURIComponent(email)}`)
}
```

Notes:
- `email` trim guards against pure-whitespace submissions slipping past the `required` attribute.
- `siteUrl` fallback matches the convention already used in `app/account/actions.ts:24`.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS (no errors). The action file is unused by any page yet, but it must type-check on its own.

- [ ] **Step 3: Commit**

```bash
git add app/account/recover/actions.ts
git commit -m "feat(auth): add requestReset server action for password recovery"
```

---

## Task 2: Recover page rewrite — request-link form + success state

**Files:**
- Modify (full replace): `app/account/recover/page.tsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `app/account/recover/page.tsx` with:

```tsx
import Link from 'next/link'
import { requestReset } from './actions'

export const metadata = {
  title: 'Recover Access',
  description: 'Reset your Hollow Ronin password.',
}

export default async function RecoverPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string; email?: string }>
}) {
  const { error, sent, email } = await searchParams
  const isSuccess = sent === 'true'

  return (
    <main className="relative min-h-[calc(100vh-68px)] flex items-center justify-center overflow-hidden px-6 py-24 sm:py-32 bg-obsidian text-bone">
      {/* Soft vignette — gold above, blood-ember below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,169,97,0.06) 0%, transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(161,24,42,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Scanline texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px)',
          opacity: 0.35,
        }}
      />

      <article className="relative z-10 w-full max-w-[480px] flex flex-col items-center text-center">
        <p
          className="animate-fade-up delay-1 flex items-center gap-3 font-mono uppercase text-[10px]"
          style={{ letterSpacing: '0.4em', color: 'rgba(201,169,97,0.78)' }}
        >
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
          Hollow Ronin · Recovery
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
        </p>

        <h1
          className="animate-fade-up delay-2 mt-7 font-bebas text-bone"
          style={{
            fontSize: 'clamp(56px, 9vw, 104px)',
            lineHeight: 0.92,
            letterSpacing: '0.14em',
            textShadow:
              '0 0 38px rgba(201,169,97,0.22), 0 0 90px rgba(201,169,97,0.06)',
          }}
        >
          RECOVER
        </h1>

        <p
          className="animate-fade-up delay-2 mt-5 max-w-[360px] text-bone/70 italic"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          {isSuccess
            ? 'Check your email. A reset link has been sent.'
            : "Enter your email and we'll send a link to reset your password."}
        </p>

        <div
          aria-hidden
          className="animate-fade-up delay-3 mt-10 mb-9 h-px w-24"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(201,169,97,0.55), transparent)',
          }}
        />

        {error && (
          <div
            role="alert"
            className="animate-fade-up delay-3 w-full mb-6 px-4 py-3 border"
            style={{
              borderColor: 'rgba(161,24,42,0.55)',
              background: 'rgba(161,24,42,0.08)',
            }}
          >
            <p
              className="font-mono uppercase text-[10px]"
              style={{ letterSpacing: '0.22em', color: '#e26579' }}
            >
              {error}
            </p>
          </div>
        )}

        {isSuccess ? (
          <div
            role="status"
            className="animate-fade-up delay-4 w-full px-5 py-6 border border-bone/15"
            style={{ background: 'rgba(244,237,226,0.02)' }}
          >
            <p
              className="font-mono uppercase text-[10px]"
              style={{ letterSpacing: '0.3em', color: 'rgba(201,169,97,0.85)' }}
            >
              Sent
            </p>
            {email && (
              <p
                className="mt-3 text-bone/80 italic break-all"
                style={{ fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.6 }}
              >
                A reset link has been sent to {email}.
              </p>
            )}
          </div>
        ) : (
          <form action={requestReset} className="animate-fade-up delay-4 w-full flex flex-col gap-4">
            <div className="relative w-full text-left">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                autoComplete="email"
                required
                className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 py-5 font-mono text-base text-bone caret-blood placeholder:text-bone/30 placeholder:lowercase placeholder:tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
                style={{ letterSpacing: '0.08em' }}
              />
            </div>

            <button
              type="submit"
              className="mt-4 min-h-[56px] bg-[#c9a961] text-obsidian font-bebas uppercase py-4 text-base transition-all duration-300 hover:bg-[#a88b45] focus:outline-none focus-visible:bg-[#a88b45] focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99]"
              style={{ letterSpacing: '0.28em' }}
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="animate-fade-up delay-5 mt-8 font-mono uppercase text-[11px] tracking-[0.3em] text-bone/40">
          <Link
            href="/account"
            className="underline underline-offset-4 decoration-bone/0 transition-all duration-200 hover:text-gold hover:decoration-bone/40 focus:outline-none focus-visible:text-gold focus-visible:decoration-bone/40"
          >
            ← Back to Sign In
          </Link>
        </div>
      </article>
    </main>
  )
}
```

Notes:
- `searchParams` is a Promise — Next.js 16 App Router convention (matches `app/account/page.tsx:6-10`).
- Tagline color goes `bone/70` (success state warmth) instead of the `bone/45` used on `/account` tagline — intentional, the recover page tagline is utility copy, not atmosphere.
- Sigil watermark from old stub is **gone**. Scanline texture is added to match `/account`.
- Success block reuses the bordered card pattern but with success messaging — `role="status"`, gold "Sent" badge instead of "Coming soon".

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Production build**

Run: `npm run build 2>&1 | tail -40`
Expected: PASS. Route `/account/recover` listed in the route manifest output.

- [ ] **Step 4: Manual browser verify (recover page only)**

Run: `npm run dev`
Open: `http://localhost:3000/account/recover`

Verify:
- No sigil watermark, no "LOST KEY" headline, no "Coming soon — Drop 002" card, no mailto.
- Badge reads "Hollow Ronin · Recovery".
- Headline reads "RECOVER" in Bebas, gold textShadow.
- Form has one email input + one gold "Send Reset Link" button, no icons inside input.
- "← Back to Sign In" link in footer; hover turns gold.
- Visit `/account/recover?error=Email%20required` — blood-colored alert renders above the form, `role="alert"`.
- Visit `/account/recover?sent=true&email=test%40example.com` — form is replaced by the bordered "Sent" status card showing the email.

Stop dev server before continuing.

- [ ] **Step 5: Commit**

```bash
git add app/account/recover/page.tsx
git commit -m "feat(auth): rewrite /account/recover with functional reset request form"
```

---

## Task 3: Reset server action — `updatePassword`

**Files:**
- Create: `app/account/reset/actions.ts`

- [ ] **Step 1: Write `updatePassword`**

Create `app/account/reset/actions.ts` with:

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string | null
  const confirm = formData.get('confirm') as string | null

  if (!password || password.length < 6) {
    redirect('/account/reset?error=Password must be at least 6 characters')
  }

  if (password !== confirm) {
    redirect('/account/reset?error=Passwords do not match')
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/account/recover?error=Session expired. Request a new link.')
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    redirect(`/account/reset?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}
```

Notes:
- 6-char min matches the existing `minLength={6}` on the sign-in form (`app/account/page.tsx:217`).
- If session is gone (link expired, cookies cleared), redirect back to `/account/recover` with a clear error — better UX than dropping the user on a broken page.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add app/account/reset/actions.ts
git commit -m "feat(auth): add updatePassword server action for reset flow"
```

---

## Task 4: Reset page — session-gated new-password form

**Files:**
- Create: `app/account/reset/page.tsx`

- [ ] **Step 1: Write the reset page**

Create `app/account/reset/page.tsx` with:

```tsx
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updatePassword } from './actions'

export const metadata = {
  title: 'Reset Password',
  description: 'Choose a new password for your Hollow Ronin account.',
}

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/account/recover?error=Link expired or invalid')
  }

  const { error } = await searchParams

  return (
    <main className="relative min-h-[calc(100vh-68px)] flex items-center justify-center overflow-hidden px-6 py-24 sm:py-32 bg-obsidian text-bone">
      {/* Soft vignette — gold above, blood-ember below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,169,97,0.06) 0%, transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(161,24,42,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Scanline texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px)',
          opacity: 0.35,
        }}
      />

      <article className="relative z-10 w-full max-w-[480px] flex flex-col items-center text-center">
        <p
          className="animate-fade-up delay-1 flex items-center gap-3 font-mono uppercase text-[10px]"
          style={{ letterSpacing: '0.4em', color: 'rgba(201,169,97,0.78)' }}
        >
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
          Hollow Ronin · Recovery
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
        </p>

        <h1
          className="animate-fade-up delay-2 mt-7 font-bebas text-bone"
          style={{
            fontSize: 'clamp(56px, 9vw, 104px)',
            lineHeight: 0.92,
            letterSpacing: '0.14em',
            textShadow:
              '0 0 38px rgba(201,169,97,0.22), 0 0 90px rgba(201,169,97,0.06)',
          }}
        >
          RESET
        </h1>

        <p
          className="animate-fade-up delay-2 mt-5 max-w-[360px] text-bone/70 italic"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          Choose a new password.
        </p>

        <div
          aria-hidden
          className="animate-fade-up delay-3 mt-10 mb-9 h-px w-24"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(201,169,97,0.55), transparent)',
          }}
        />

        {error && (
          <div
            role="alert"
            className="animate-fade-up delay-3 w-full mb-6 px-4 py-3 border"
            style={{
              borderColor: 'rgba(161,24,42,0.55)',
              background: 'rgba(161,24,42,0.08)',
            }}
          >
            <p
              className="font-mono uppercase text-[10px]"
              style={{ letterSpacing: '0.22em', color: '#e26579' }}
            >
              {error}
            </p>
          </div>
        )}

        <form action={updatePassword} className="animate-fade-up delay-4 w-full flex flex-col gap-4">
          <div className="relative w-full text-left">
            <label htmlFor="password" className="sr-only">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="new password"
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 py-5 font-mono text-base text-bone caret-blood placeholder:text-bone/30 placeholder:lowercase placeholder:tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
              style={{ letterSpacing: '0.08em' }}
            />
          </div>

          <div className="relative w-full text-left">
            <label htmlFor="confirm" className="sr-only">Confirm Password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="confirm password"
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 py-5 font-mono text-base text-bone caret-blood placeholder:text-bone/30 placeholder:lowercase placeholder:tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
              style={{ letterSpacing: '0.08em' }}
            />
          </div>

          <button
            type="submit"
            className="mt-4 min-h-[56px] bg-[#c9a961] text-obsidian font-bebas uppercase py-4 text-base transition-all duration-300 hover:bg-[#a88b45] focus:outline-none focus-visible:bg-[#a88b45] focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99]"
            style={{ letterSpacing: '0.28em' }}
          >
            Update Password
          </button>
        </form>

        <div className="animate-fade-up delay-5 mt-8 font-mono uppercase text-[11px] tracking-[0.3em] text-bone/40">
          <Link
            href="/account"
            className="underline underline-offset-4 decoration-bone/0 transition-all duration-200 hover:text-gold hover:decoration-bone/40 focus:outline-none focus-visible:text-gold focus-visible:decoration-bone/40"
          >
            ← Back to Sign In
          </Link>
        </div>
      </article>
    </main>
  )
}
```

Notes:
- Session gate runs **before** rendering — no flicker, no client-side check, no leak of the form to unauthenticated users.
- Same Badge text ("Hollow Ronin · Recovery") as the recover page — both pages belong to one flow.
- `autoComplete="new-password"` on both fields signals to password managers that this is a creation event, not a sign-in.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Production build**

Run: `npm run build 2>&1 | tail -40`
Expected: PASS. Route `/account/reset` listed in the manifest.

- [ ] **Step 4: Commit**

```bash
git add app/account/reset/page.tsx
git commit -m "feat(auth): add /account/reset page with session-gated update form"
```

---

## Task 5: Verify the callback route still handles `?next`

**Files:**
- Read-only: `app/auth/callback/route.ts`

- [ ] **Step 1: Re-read the file**

Read `app/auth/callback/route.ts`. Confirm these three properties hold:

1. It reads `searchParams.get('next')`.
2. It rejects values not starting with a single `/` (open-redirect guard, currently line 9: `rawNext.startsWith('/') && !rawNext.startsWith('//')`).
3. On successful `exchangeCodeForSession`, it redirects to `${origin}${next}`.

If all three hold, no changes needed — skip to Step 2.

If anything has regressed since commit `7c0b34b`, the file must look like this (do **not** edit unless regressed):

```ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const rawNext = searchParams.get('next') ?? '/account'
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/account'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/account?error=Auth failed`)
}
```

- [ ] **Step 2: No commit if untouched**

If you did not modify the file, do nothing. If you had to restore it, commit:

```bash
git add app/auth/callback/route.ts
git commit -m "fix(auth): restore ?next handling on callback route"
```

---

## Task 6: End-to-end manual verification

**No code changes in this task.** Run the full happy path in a real browser.

- [ ] **Step 1: Confirm env**

Verify `.env.local` (or running env) has:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (set to `http://localhost:3000` for local testing, or leave unset — the action falls back to `https://hollowronin.com`, which will not work for local email links)

For local testing, set:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Otherwise the reset link in the email will point to production.

- [ ] **Step 2: Boot dev**

Run: `npm run dev`
Wait for: `Ready in <Xms>` on `http://localhost:3000`.

- [ ] **Step 3: Walk the flow**

In a browser:

1. Go to `http://localhost:3000/account`. Sign-out if signed in.
2. Click **"Forgot password?"** in the footer. Land on `/account/recover`.
3. Verify aesthetic: badge says "Hollow Ronin · Recovery", headline says "RECOVER", no sigil, no "LOST KEY", no "Coming soon" card, no mailto.
4. Submit a registered email. Redirect to `/account/recover?sent=true&email=...`. Confirmation card appears with the email shown.
5. Open the inbox for that account. Open the Supabase password-recovery email. Click the link.
6. The link goes to `…/auth/callback?code=…&next=/account/reset`. Callback exchanges the code and redirects to `/account/reset`.
7. On `/account/reset`: verify badge / "RESET" headline / two password inputs / "Update Password" gold button / "← Back to Sign In" footer link.
8. Enter mismatched passwords → after submit, redirect back to `/account/reset?error=Passwords%20do%20not%20match`. Blood-colored alert renders above the form.
9. Enter a password shorter than 6 chars (bypass the `minLength` by editing the DOM if needed, or rely on it). Error: "Password must be at least 6 characters".
10. Enter matching valid passwords → redirect to `/account`. Signed-in view shows the user email + Sign Out button. Sign out works.
11. Visit `/account/reset` directly while signed out → redirects to `/account/recover?error=Link%20expired%20or%20invalid`. Blood alert renders.

- [ ] **Step 4: Mobile-width check**

Open Chrome DevTools, switch to a 375px viewport. Reload `/account/recover` and `/account/reset`. Confirm:
- Card stays centered, no horizontal scroll.
- Headline wraps cleanly.
- Buttons are full-width and at least 56px tall.
- Footer link wraps under without colliding.

- [ ] **Step 5: Stop dev**

`Ctrl+C` to stop the dev server.

---

## Task 7: Final commit and out-of-scope notes

- [ ] **Step 1: Confirm clean tree**

Run: `git status`
Expected: clean (all per-task commits done). If anything is unstaged, inspect and commit or revert.

- [ ] **Step 2: Squash decision (optional)**

The per-task commits already form a clean history:
- `feat(auth): add requestReset server action for password recovery`
- `feat(auth): rewrite /account/recover with functional reset request form`
- `feat(auth): add updatePassword server action for reset flow`
- `feat(auth): add /account/reset page with session-gated update form`

If a single commit is preferred, soft-reset to the branch base and recommit as:

```bash
git reset --soft <base-sha>
git commit -m "feat(auth): real password recovery flow — recover + reset pages"
```

**Do not** force-push or rewrite history if these commits have been pushed. Ask the user first.

- [ ] **Step 3: Surface the out-of-scope notes**

In the PR description (or chat reply if no PR), include:

> **Out of scope but worth flagging:**
> - **Supabase email template** for password recovery currently uses default branding. Customizing requires Supabase Dashboard → Authentication → Email Templates → Reset Password. Not blocking.
> - **Rate limiting:** Supabase has built-in rate limits on `resetPasswordForEmail` (default 60s between requests per email). No extra work needed in this app.
> - **`NEXT_PUBLIC_SITE_URL`** must be set in the deployment env. Without it, email links fall back to `https://hollowronin.com`. Verify before merging.

---

## Verification Summary (run at the end)

| Check | Command / Action | Expected |
|-------|------------------|----------|
| Types | `npx tsc --noEmit` | Zero errors |
| Build | `npm run build` | Routes `/account/recover` and `/account/reset` registered, no warnings on those files |
| Recover page UX | Visit `/account/recover` | RECOVER headline, single email field, gold button, no sigil |
| Recover success state | `?sent=true&email=…` | Form replaced by bordered "Sent" card |
| Reset page gate | Visit `/account/reset` signed out | Redirect to `/account/recover?error=Link%20expired%20or%20invalid` |
| Reset page UX | Reach `/account/reset` via callback signed in | RESET headline, two password fields, gold button |
| Reset mismatch | Submit mismatched passwords | `role="alert"` blood card above the form |
| Reset success | Submit valid matching passwords | Redirect to `/account`, signed in |
| Aesthetic | Compare `/account` (signed out) and `/account/recover` and `/account/reset` side-by-side | Same vignette + scanline + Badge + Bebas headline + Georgia italic tagline + hairline divider + gold button — only the copy differs |
