"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS_LEFT = ["COLLECTIONS", "ARCHIVE"];
const LINKS_RIGHT = ["EDITORIAL", "STUDIO"];
const MOBILE_LINKS = ["COLLECTIONS", "ARCHIVE", "EDITORIAL", "STUDIO"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 48px",
        background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(19,19,19,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #444748",
        transition: "all 0.5s",
      }} className="navbar">
        {/* Left links — hidden on mobile */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="nav-desktop-links">
          {LINKS_LEFT.map(l => (
            <Link key={l} href="#" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4c7c7", textDecoration: "none" }}>
              {l}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Link href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "44px", letterSpacing: "-0.01em", color: "#c9c6c5", textDecoration: "none" }}>
            HOLLOW RONIN
          </Link>
        </div>

        {/* Right links — hidden on mobile */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="nav-desktop-links">
          {LINKS_RIGHT.map(l => (
            <Link key={l} href="#" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4c7c7", textDecoration: "none" }}>
              {l}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "16px", marginLeft: "16px" }}>
            <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "20px" }}>🛒</span>
            <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "20px" }}>👤</span>
          </div>
        </div>

        {/* Hamburger — visible on mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", display: "flex", flexDirection: "column",
            gap: "5px", zIndex: 60,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: "22px", height: "1.5px", background: "#f0ede6",
              transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                  : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)"
                  : "scaleX(0)"
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 40,
        background: "rgba(10,10,10,0.98)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: "40px",
        transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {MOBILE_LINKS.map(l => (
          <Link
            key={l}
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 8vw, 56px)",
              letterSpacing: "0.08em", color: "#f0ede6", textDecoration: "none",
            }}
          >
            {l}
          </Link>
        ))}
        <div style={{ display: "flex", gap: "24px" }}>
          <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "28px" }}>🛒</span>
          <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "28px" }}>👤</span>
        </div>
      </div>
    </>
  );
}
