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

  const linkStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#6b6b6b",
    textDecoration: "none",
    transition: "color 0.3s",
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 48px",
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #2e2e2e" : "none",
        transition: "all 0.5s",
      }}>
        <div className="hidden md:flex" style={{ gap: "32px" }}>
          {["COLLECTIONS","ARCHIVE"].map(l => (
            <Link key={l} href="#" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "#c0001e")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6b6b6b")}>
              {l}
            </Link>
          ))}
        </div>

        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Link href="/" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            letterSpacing: "-0.01em",
            color: "#f0ede6",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#c0001e")}
          onMouseLeave={e => (e.currentTarget.style.color = "#f0ede6")}>
            HOLLOW RONIN
          </Link>
        </div>

        <div className="hidden md:flex" style={{ gap: "32px", alignItems: "center" }}>
          {["EDITORIAL","STUDIO"].map(l => (
            <Link key={l} href="#" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "#c0001e")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6b6b6b")}>
              {l}
            </Link>
          ))}
          <span style={{ ...linkStyle, color: "#f0ede6", cursor: "pointer" }}>
            CART <span style={{ color: "#c0001e" }}>0</span>
          </span>
        </div>

        <button className="md:hidden" style={{ ...linkStyle, background: "none", border: "none", cursor: "pointer", color: "#f0ede6", marginLeft: "auto" }}
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      <div style={{ position: "fixed", top: "57px", left: 0, right: 0, height: "1px", background: "rgba(192,0,30,0.4)", zIndex: 50 }} />

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "#0a0a0a", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "40px" }}>
          {["COLLECTIONS","ARCHIVE","EDITORIAL","STUDIO"].map(item => (
            <Link key={item} href="#" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "60px", color: "#f0ede6", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#c0001e")}
              onMouseLeave={e => (e.currentTarget.style.color = "#f0ede6")}>
              {item}
            </Link>
          ))}
          <div style={{ height: "1px", width: "80px", background: "#c0001e" }} />
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: "#6b6b6b" }}>NO MASTER // NO RULES</p>
        </div>
      )}
    </>
  );
}
