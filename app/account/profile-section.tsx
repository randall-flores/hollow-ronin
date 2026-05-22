// app/account/profile-section.tsx
'use client'

import { useState, type FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AuthAlert } from './auth-alert'
import { CLAN_OPTIONS, type ClanValue, type Profile } from './account-types'

type Status = 'idle' | 'saving' | 'success' | 'error'

export function ProfileSection({
  userId,
  email,
  profile,
}: {
  userId: string
  email: string
  profile: Profile | null
}) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [clan, setClan] = useState<ClanValue | ''>(profile?.clan ?? '')
  const [phone, setPhone] = useState(profile?.phone ?? '')
  const [birthday, setBirthday] = useState(profile?.birthday ?? '')

  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>()

  const saving = status === 'saving'

  // After a save, any further edit invalidates the result banner so it can't
  // imply the new (unsaved) edit was persisted. Leaves idle/saving untouched.
  function noteEdit() {
    setStatus((s) => (s === 'success' || s === 'error' ? 'idle' : s))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (saving) return
    setStatus('saving')
    setErrorMsg(undefined)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName.trim() || null,
          clan: clan || null,
          phone: phone.trim() || null,
          birthday: birthday || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (error) {
        setErrorMsg(error.message)
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      // .update can throw (network/config) instead of returning { error }.
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section
      aria-labelledby="profile-heading"
      className="animate-fade-up delay-2 w-full flex flex-col gap-8 text-left"
    >
      <header>
        <p className="font-mono uppercase text-[10px] tracking-[0.35em] text-gold/70">
          Your record
        </p>
        <h2
          id="profile-heading"
          className="mt-2 font-bebas uppercase text-bone"
          style={{ fontSize: 'clamp(34px, 6vw, 56px)', letterSpacing: '0.08em' }}
        >
          Profile
        </h2>
      </header>

      {profile === null && (
        <p
          role="status"
          className="font-mono uppercase text-[10px] tracking-[0.22em] text-bone/40"
        >
          Summoning your record…
        </p>
      )}

      {status === 'success' && <AuthAlert message="Profile updated" />}
      {status === 'error' && <AuthAlert error={errorMsg} />}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <TextField
          id="display_name"
          label="Display name"
          value={displayName}
          onChange={(v) => {
            setDisplayName(v)
            noteEdit()
          }}
          placeholder="display name"
          autoComplete="name"
        />

        <div className="relative w-full text-left">
          <label
            htmlFor="clan"
            className="mb-2 block font-mono uppercase text-[10px] tracking-[0.3em] text-bone/40"
          >
            Clan affiliation
          </label>
          <select
            id="clan"
            value={clan}
            onChange={(e) => {
              setClan(e.target.value as ClanValue | '')
              noteEdit()
            }}
            className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 font-mono text-base text-bone [color-scheme:dark] focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
            style={{ letterSpacing: '0.08em' }}
          >
            {CLAN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <TextField
          id="phone"
          label="Phone"
          type="tel"
          value={phone}
          onChange={(v) => {
            setPhone(v)
            noteEdit()
          }}
          placeholder="phone"
          autoComplete="tel"
        />

        <div className="relative w-full text-left">
          <label
            htmlFor="birthday"
            className="mb-2 block font-mono uppercase text-[10px] tracking-[0.3em] text-bone/40"
          >
            Birthday
          </label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value)
              noteEdit()
            }}
            className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 font-mono text-base text-bone caret-blood [color-scheme:dark] focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
            style={{ letterSpacing: '0.08em' }}
          />
        </div>

        <div className="relative w-full text-left">
          <label
            htmlFor="email"
            className="mb-2 block font-mono uppercase text-[10px] tracking-[0.3em] text-bone/40"
          >
            Email (read-only)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            readOnly
            disabled
            className="w-full min-h-[56px] bg-bone/[0.02] border-[1.5px] border-bone/[0.08] px-5 font-mono text-base text-bone/45 cursor-not-allowed"
            style={{ letterSpacing: '0.08em' }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          aria-busy={saving}
          className="mt-4 min-h-[56px] bg-[#c9a961] text-obsidian font-bebas uppercase py-4 text-base transition-all duration-300 hover:bg-[#a88b45] focus:outline-none focus-visible:bg-[#a88b45] focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ letterSpacing: '0.28em' }}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </section>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: 'text' | 'tel'
  autoComplete?: string
}) {
  return (
    <div className="relative w-full text-left">
      <label
        htmlFor={id}
        className="mb-2 block font-mono uppercase text-[10px] tracking-[0.3em] text-bone/40"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 py-5 font-mono text-base text-bone caret-blood placeholder:text-bone/30 placeholder:lowercase placeholder:tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
        style={{ letterSpacing: '0.08em' }}
      />
    </div>
  )
}
