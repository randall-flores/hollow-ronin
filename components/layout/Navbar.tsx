"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";

const NAV_LINKS = [
  { label: "DROPS",    href: "/shop" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "ABOUT",    href: "/about" },
];

const SHOP_CATEGORIES = [
  { label: "SHIRTS",     href: "/shop/shirts" },
  { label: "VIEW ALL →", href: "/shop/shirts" },
];

const navLinkStyle: React.CSSProperties = {
  fontFamily:    "'DM Mono', monospace",
  fontSize:      "11px",
  letterSpacing: "0.15em",
  color:         "#F4EDE2",
  textDecoration:"none",
  textTransform: "uppercase",
  transition:    "color 0.25s ease",
};

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [shopOpen,  setShopOpen]  = useState(false);
  const shopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { count: cartCount, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function openShop()  { if (shopTimer.current) clearTimeout(shopTimer.current); setShopOpen(true); }
  function closeShop() { shopTimer.current = setTimeout(() => setShopOpen(false), 150); }

  return (
    <>
      <nav
        className="navbar"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "100%",
          zIndex:        100,
          height:        "68px",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
          padding:       "0 40px",
          background:    "#0A0A0A",
          borderBottom:  "1px solid rgba(201,160,39,0.40)",
          boxShadow:     scrolled ? "0 6px 24px rgba(0,0,0,0.45)" : "none",
          transition:    "box-shadow 0.4s ease",
        }}
      >
        {/* LEFT — logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border:     "none",
              cursor:     "pointer",
              color:      "#F4EDE2",
              fontSize:   "22px",
              lineHeight: 1,
              padding:    "4px",
            }}
          >
            ☰
          </button>

          <Link href="/" style={{ display: "flex", alignItems: "center" }} aria-label="Hollow Ronin home">
            <Image
              src="/logo-mask-transparent.png"
              alt="Hollow Ronin"
              width={120}
              height={48}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* CENTER — nav links */}
        <div
          className="nav-desktop-links"
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "32px",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A027")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#F4EDE2")}
            >
              {label}
            </Link>
          ))}

          <div style={{ position: "relative" }} onMouseEnter={openShop} onMouseLeave={closeShop}>
            <Link
              href="/shop"
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A027")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#F4EDE2")}
            >
              SHOP
            </Link>
          </div>
        </div>

        {/* RIGHT — cart + account */}
        <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <button
            aria-label="Cart"
            onClick={openCart}
            style={{
              background: "none",
              border:     "none",
              cursor:     "pointer",
              color:      "#F4EDE2",
              padding:    0,
              position:   "relative",
              transition: "color 0.25s ease",
              display:    "flex",
              alignItems: "center",
              lineHeight: 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#C9A027")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#F4EDE2")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <path d="M3 4h2l2.5 12h11L21 8H6" />
              <circle cx="9"  cy="20" r="1.2" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            {cartCount > 0 && (
              <span
                aria-label={`${cartCount} item${cartCount === 1 ? "" : "s"} in cart`}
                style={{
                  position: "absolute",
                  top:      "-8px",
                  right:    "-10px",
                  minWidth: 18, height: 18,
                  padding:  "0 5px",
                  background: "#A1182A",
                  color:      "#F4EDE2",
                  fontFamily: "'DM Mono', monospace",
                  fontSize:   10,
                  display:    "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <Link
            href="/account"
            aria-label="Account"
            style={{
              color: "#F4EDE2",
              textDecoration: "none",
              transition: "color 0.25s ease",
              display: "flex",
              alignItems: "center",
              lineHeight: 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#C9A027")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F4EDE2")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* SHOP MEGA MENU */}
      <div
        onMouseEnter={openShop}
        onMouseLeave={closeShop}
        style={{
          position:     "fixed",
          top:          "68px",
          left:         0,
          width:        "100vw",
          background:   "#0A0A0A",
          borderTop:    "1px solid rgba(201,160,39,0.40)",
          borderBottom: "1px solid rgba(201,160,39,0.20)",
          padding:      "40px 80px",
          zIndex:       99,
          opacity:      shopOpen ? 1 : 0,
          transform:    shopOpen ? "translateY(0)" : "translateY(-8px)",
          transition:   "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: shopOpen ? "auto" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{ width: "60%" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.3em", color: "#C9A027", textTransform: "uppercase", marginBottom: 20 }}>
              COLLECTION
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px 24px" }}>
              {SHOP_CATEGORIES.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setShopOpen(false)}
                  style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontWeight: 600,
                    fontSize:   "22px",
                    letterSpacing: "0.06em",
                    color: "#F4EDE2",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.25s ease",
                    paddingBottom: 2,
                    borderBottom:  "1px solid transparent",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A027"; e.currentTarget.style.borderBottomColor = "rgba(201,160,39,0.6)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#F4EDE2"; e.currentTarget.style.borderBottomColor = "transparent"; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ width: "1px", alignSelf: "stretch", background: "rgba(201,160,39,0.2)", margin: "0 40px", flexShrink: 0 }} />

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.3em", color: "#C9A027", textTransform: "uppercase", marginBottom: 12 }}>
              DROP 001
            </div>
            <div style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 700, fontSize: 32, letterSpacing: "0.04em", color: "#F4EDE2", marginBottom: 8 }}>
              The Void Collection
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.3em", color: "#C9A027", textTransform: "uppercase", marginBottom: 16 }}>
              NOW LIVE
            </div>
            <Link
              href="/drops"
              onClick={() => setShopOpen(false)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize:   10,
                letterSpacing: "0.2em",
                color: "#F4EDE2",
                textDecoration: "none",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A027")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#F4EDE2")}
            >
              → EXPLORE DROP
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        200,
          background:    "#0A0A0A",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "flex-start",
          justifyContent:"center",
          padding:       "80px 40px",
          transform:     menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition:    "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: "#F4EDE2", fontSize: 26 }}
        >
          ✕
        </button>

        {[...NAV_LINKS, { label: "SHOP", href: "/shop" }].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontWeight: 700,
              fontSize:   "clamp(28px, 6vw, 40px)",
              letterSpacing: "0.06em",
              color: "#C9A027",
              textDecoration: "none",
              padding: "12px 0",
            }}
          >
            {label}
          </Link>
        ))}

        <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
          <button
            onClick={() => { setMenuOpen(false); openCart(); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#F4EDE2", position: "relative", display: "flex", alignItems: "center", lineHeight: 0 }}
            aria-label="Cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <path d="M3 4h2l2.5 12h11L21 8H6" />
              <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -12,
                minWidth: 18, height: 18, padding: "0 5px",
                background: "#A1182A", color: "#F4EDE2",
                fontFamily: "'DM Mono', monospace", fontSize: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            style={{ color: "#F4EDE2", textDecoration: "none", display: "flex", alignItems: "center", lineHeight: 0 }}
            aria-label="Account"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
