// app/account/account-nav.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NAV_ITEMS, type SectionId } from './account-types'

export function AccountNav({ active }: { active: SectionId }) {
  const router = useRouter()

  return (
    <nav aria-label="Account sections" className="w-full">
      {/* Mobile: select (shown < sm) */}
      <div className="sm:hidden">
        <label htmlFor="account-section-select" className="sr-only">
          Account section
        </label>
        <select
          id="account-section-select"
          value={active}
          onChange={(e) => router.push(`/account?section=${e.target.value}`)}
          className="w-full min-h-[52px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-4 font-mono uppercase text-[12px] tracking-[0.2em] text-bone [color-scheme:dark] focus:outline-none focus:border-blood focus-visible:ring-1 focus-visible:ring-blood/40"
        >
          {NAV_ITEMS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
              {item.live ? '' : ' · soon'}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: vertical rail (shown ≥ sm) */}
      <ul className="hidden sm:flex sm:flex-col sm:gap-px">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <Link
                href={`/account?section=${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'group flex items-center justify-between gap-2 px-4 py-3 font-mono uppercase text-[12px] tracking-[0.22em] transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian',
                  isActive
                    ? 'bg-bone/[0.04] text-gold border-l-2 border-gold'
                    : 'text-bone/55 border-l-2 border-transparent hover:text-bone hover:bg-bone/[0.02]',
                ].join(' ')}
              >
                <span>{item.label}</span>
                {!item.live && <LockMark />}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function LockMark() {
  return (
    <svg
      aria-hidden
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-bone/30"
    >
      <rect x="4" y="10" width="16" height="11" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}
