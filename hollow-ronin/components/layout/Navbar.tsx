"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-page py-4 transition-all duration-500 ${
        scrolled ? "bg-void/90 backdrop-blur-md border-b border-gray-outline" : "bg-transparent"
      }`}>
        {/* Left */}
        <div className="hidden md:flex gap-8 items-center">
          {["COLLECTIONS","ARCHIVE"].map(l => (
            <Link key={l} href="#" className="font-mono text-[10px] tracking-[0.2em] text-gray-dim hover:text-red transition-colors duration-300">{l}</Link>
          ))}
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="font-bebas text-2xl tracking-tight text-cream hover:text-red transition-colors duration-300">
            HOLLOW RONIN
          </Link>
        </div>

        {/* Right */}
        <div className="hidden md:flex gap-8 items-center ml-auto">
          {["EDITORIAL","STUDIO"].map(l => (
            <Link key={l} href="#" className="font-mono text-[10px] tracking-[0.2em] text-gray-dim hover:text-red transition-colors duration-300">{l}</Link>
          ))}
          <div className="flex gap-4 ml-4">
            <button className="font-mono text-[10px] tracking-[0.2em] text-cream hover:text-red transition-colors">
              CART <span className="text-red ml-1">0</span>
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden ml-auto font-mono text-[10px] tracking-widest text-cream" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Red underline */}
      <div className="fixed top-[57px] left-0 right-0 h-px bg-red/40 z-50" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-void flex flex-col justify-center items-center gap-10 md:hidden">
          {["COLLECTIONS","ARCHIVE","EDITORIAL","STUDIO"].map(item => (
            <Link key={item} href="#"
              className="font-bebas text-6xl text-cream hover:text-red transition-colors"
              onClick={() => setMenuOpen(false)}>
              {item}
            </Link>
          ))}
          <div className="h-px w-20 bg-red mt-4" />
          <p className="font-mono text-[9px] tracking-[0.2em] text-gray-dim">NO MASTER // NO RULES</p>
        </div>
      )}
    </>
  );
}
