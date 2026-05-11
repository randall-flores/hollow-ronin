"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "DROPS", href: "/drops" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "ABOUT", href: "/about" },
];

const SHOP_CATEGORIES = [
  { label: "HOODIES", href: "/shop/hoodies" },
  { label: "SHIRTS", href: "/shop/shirts" },
  { label: "HATS", href: "/shop/hats" },
  { label: "BEANIES", href: "/shop/beanies" },
  { label: "SOCKS", href: "/shop/socks" },
  { label: "SCARFS", href: "/shop/scarfs" },
  { label: "HOODED MASKS", href: "/shop/masked-hoodies" },
  { label: "VIEW ALL →", href: "/shop" },
];

const navLinkStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "10px",
  letterSpacing: "0.2em",
  color: "#a8a8a8",
  textDecoration: "none",
  textTransform: "uppercase",
  transition: "color 0.2s",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function openShop() {
    if (shopTimer.current) clearTimeout(shopTimer.current);
    setShopOpen(true);
  }

  function closeShop() {
    shopTimer.current = setTimeout(() => setShopOpen(false), 150);
  }

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          height: "68px",
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(180,20,20,0.4)"
            : "1px solid transparent",
          transition:
            "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* LEFT ZONE — empty desktop / hamburger mobile */}
        <div style={{ width: "25%", display: "flex", alignItems: "center" }}>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
              fontSize: "24px",
              lineHeight: "1",
              padding: "4px",
            }}
          >
            ☰
          </button>
        </div>

        {/* CENTER ZONE — logo lockup */}
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              textDecoration: "none",
            }}
          >
            <img
              src="/images/logo-mask.png"
              alt=""
              style={{
                width: 44,
                height: 44,
                objectFit: "contain",
                mixBlendMode: "screen",
              }}
            />
            <img
              src="/images/hollow-ronin-wordmark.png"
              alt="Hollow Ronin"
              style={{
                height: 38,
                width: "auto",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </Link>
        </div>

        {/* RIGHT ZONE — nav links + icons */}
        <div
          className="nav-desktop-links"
          style={{
            width: "25%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a8a8a8")}
            >
              {label}
            </Link>
          ))}

          {/* SHOP trigger */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={openShop}
            onMouseLeave={closeShop}
          >
            <Link
              href="/shop"
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a8a8a8")}
            >
              SHOP
            </Link>
          </div>

          <button
            aria-label="Cart"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              fontSize: "20px",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#a8a8a8")
            }
          >
            🛒
          </button>

          <button
            aria-label="Account"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              fontSize: "20px",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#a8a8a8")
            }
          >
            👤
          </button>
        </div>
      </nav>

      {/* SHOP MEGA MENU */}
      <div
        onMouseEnter={openShop}
        onMouseLeave={closeShop}
        style={{
          position: "fixed",
          top: "68px",
          left: 0,
          width: "100vw",
          background: "rgba(4,2,2,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(180,20,20,0.3)",
          borderBottom: "1px solid rgba(180,20,20,0.15)",
          padding: "40px 80px",
          zIndex: 99,
          opacity: shopOpen ? 1 : 0,
          transform: shopOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: shopOpen ? "auto" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {/* LEFT — category grid */}
          <div style={{ width: "60%" }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(180,20,20,0.8)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              COLLECTION
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px 24px",
              }}
            >
              {SHOP_CATEGORIES.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setShopOpen(false)}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "22px",
                    letterSpacing: "0.1em",
                    color: "#6b6b6b",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.2s",
                    paddingBottom: "2px",
                    borderBottom: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f0ede6";
                    e.currentTarget.style.borderBottomColor =
                      "rgba(180,20,20,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6b6b6b";
                    e.currentTarget.style.borderBottomColor = "transparent";
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              alignSelf: "stretch",
              background: "rgba(255,255,255,0.06)",
              margin: "0 40px",
              flexShrink: 0,
            }}
          />

          {/* RIGHT — drop info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(180,20,20,0.8)",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              DROP 001
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "36px",
                letterSpacing: "0.05em",
                color: "#2a2a2a",
                marginBottom: "8px",
              }}
            >
              THE VOID COLLECTION
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "#C9A84C",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              NOW LIVE
            </div>
            <Link
              href="/drops"
              onClick={() => setShopOpen(false)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "#a8a8a8",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a8a8a8")}
            >
              → EXPLORE DROP
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer — slides from left */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.97)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 40px",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#f0ede6",
            fontSize: "28px",
          }}
        >
          ✕
        </button>

        {[...NAV_LINKS, { label: "SHOP", href: "/shop" }].map(
          ({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(28px, 6vw, 40px)",
                letterSpacing: "0.08em",
                color: "#C9A84C",
                textDecoration: "none",
                padding: "12px 0",
              }}
            >
              {label}
            </Link>
          )
        )}

        <div style={{ display: "flex", gap: "24px", marginTop: "40px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              fontSize: "24px",
            }}
            aria-label="Cart"
          >
            🛒
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              fontSize: "24px",
            }}
            aria-label="Account"
          >
            👤
          </button>
        </div>
      </div>
    </>
  );
}
