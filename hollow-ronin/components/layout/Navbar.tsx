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
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 48px",
        background: "rgba(19,19,19,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #444748",
        transition: "all 0.5s",
      }}>
        {/* Left links */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["COLLECTIONS", "ARCHIVE"].map(l => (
            <Link key={l} href="#" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4c7c7", textDecoration: "none" }}>
              {l}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Link href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", lineHeight: "44px", letterSpacing: "-0.01em", color: "#c9c6c5", textDecoration: "none" }}>
            HOLLOW RONIN
          </Link>
        </div>

        {/* Right links */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["EDITORIAL", "STUDIO"].map(l => (
            <Link key={l} href="#" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4c7c7", textDecoration: "none" }}>
              {l}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "16px", marginLeft: "16px" }}>
            <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "20px" }}>🛒</span>
            <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "20px" }}>👤</span>
          </div>
        </div>
      </nav>
    </>
  );
}
