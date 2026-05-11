// components/Navbar.jsx
// Example navbar using both logos blended cleanly into a dark background

import HollowRoninLogo from './HollowRoninLogo'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>

      {/* Logo — both blend naturally, no white or black box */}
      <HollowRoninLogo />

      {/* Nav links */}
      <ul className="hidden md:flex gap-8 text-sm tracking-widest text-zinc-400 uppercase">
        <li><a href="/drops"    className="hover:text-white transition-colors">Drops</a></li>
        <li><a href="/archive" className="hover:text-white transition-colors">Archive</a></li>
        <li><a href="/about"   className="hover:text-white transition-colors">About</a></li>
      </ul>

      {/* Cart */}
      <button className="text-zinc-400 hover:text-white transition-colors text-sm tracking-widest uppercase">
        Cart (0)
      </button>

    </nav>
  )
}
