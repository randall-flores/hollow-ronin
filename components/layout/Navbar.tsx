"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-sm border-b border-gray-mid"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          {/* LEFT NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="label hover:text-offwhite transition-colors cursor-pointer">
              Shop
            </Link>
            <Link href="/drops" className="label hover:text-offwhite transition-colors cursor-pointer">
              Drops
            </Link>
          </div>

          {/* LOGO — CENTER */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-tighter text-offwhite hover:text-red transition-colors"
            style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900 }}
          >
            HOLLOW RONIN
          </Link>

          {/* RIGHT NAV */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <Link href="/about" className="label hover:text-offwhite transition-colors cursor-pointer">
              About
            </Link>
            <button
              className="label hover:text-offwhite transition-colors flex items-center gap-2 cursor-pointer"
              aria-label="Cart — 0 items"
            >
              <CartIcon />
              <span className="text-red" aria-hidden="true">0</span>
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden ml-auto label cursor-pointer p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Red line under nav */}
        <div className="h-px bg-red w-full" aria-hidden="true" />
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center gap-10 md:hidden animate-slide-down"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {["Shop", "Drops", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="font-display text-6xl text-offwhite hover:text-red transition-colors cursor-pointer"
              style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900 }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="h-px w-24 bg-red mt-4" aria-hidden="true" />
          <p className="label text-gray-lt">No master. No rules.</p>
        </div>
      )}
    </>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
