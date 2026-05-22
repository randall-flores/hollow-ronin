// app/account/account-types.ts
// Shared data + types for the signed-in account dashboard.

export type SectionId =
  | 'overview'
  | 'profile'
  | 'orders'
  | 'addresses'
  | 'wishlist'
  | 'preferences'
  | 'security'
  | 'armory'

export type NavItem = {
  id: SectionId
  label: string
  live: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', live: true },
  { id: 'profile', label: 'Profile', live: true },
  { id: 'orders', label: 'Orders', live: false },
  { id: 'addresses', label: 'Addresses', live: false },
  { id: 'wishlist', label: 'Wishlist', live: false },
  { id: 'preferences', label: 'Preferences', live: false },
  { id: 'security', label: 'Security', live: false },
  { id: 'armory', label: 'Armory', live: false },
]

export function isSectionId(value: string | undefined): value is SectionId {
  return NAV_ITEMS.some((item) => item.id === value)
}

export type ClanValue = 'ronin' | 'akatsuki' | 'yami' | 'kage'

export type Profile = {
  display_name: string | null
  clan: ClanValue | null
  phone: string | null
  birthday: string | null // YYYY-MM-DD
}

export const CLAN_OPTIONS: { value: ClanValue | ''; label: string }[] = [
  { value: '', label: '— Unaffiliated —' },
  { value: 'ronin', label: 'Ronin' },
  { value: 'akatsuki', label: 'Akatsuki-Gumi' },
  { value: 'yami', label: 'Yami-Gumi' },
  { value: 'kage', label: 'Kage-Gumi' },
]
