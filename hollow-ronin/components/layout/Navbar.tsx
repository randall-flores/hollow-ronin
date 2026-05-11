"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = ["DROPS", "LOOKBOOK", "ABOUT", "SHOP"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
        height: "64px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(68,71,72,0.5)",
      }} className="navbar">

        {/* Left — logo mark only */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/hollow-ronin-logo.svg"
            alt="Hollow Ronin"
            width={36}
            height={36}
            style={{ objectFit: "contain" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Center — brand name, absolutely centered */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Link href="/" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "28px",
            letterSpacing: "0.06em",
            color: "#f0ede6",
            textDecoration: "none",
          }}>
            HOLLOW RONIN
          </Link>
        </div>

        {/* Right — links + icons + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }} className="nav-desktop-links">
            {NAV_LINKS.map(l => (
              <Link
                key={l}
                href={`/${l.toLowerCase()}`}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c4c7c7",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={e => (e.currentTarget.style.color = "#c4c7c7")}
              >
                {l}
              </Link>
            ))}
          </div>
          <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "18px" }}>🛒</span>
          <span style={{ color: "#c9c6c5", cursor: "pointer", fontSize: "18px" }}>👤</span>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#f0ede6", fontSize: "20px", lineHeight: "1",
              padding: "4px",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99,
        background: "rgba(0,0,0,0.97)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: "40px",
        transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute", top: "20px", right: "24px",
            background: "none", border: "none", cursor: "pointer",
            color: "#f0ede6", fontSize: "28px",
          }}
        >
          ✕
        </button>
        {NAV_LINKS.map(l => (
          <Link
            key={l}
            href={`/${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(36px, 8vw, 56px)",
              letterSpacing: "0.08em",
              color: "#f0ede6",
              textDecoration: "none",
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
