"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

const NAV_LINKS = [
  { label: "DROPS", href: "/drops" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "ABOUT", href: "/about" },
];

const SHOP_CATEGORIES: { label: string; href: string; live: boolean }[] = [
  { label: "SHIRTS",         href: "/shop/shirts",         live: true  },
  { label: "HOODIES",        href: "/shop/hoodies",        live: false },
  { label: "MASKED HOODIES", href: "/shop/masked-hoodies", live: false },
  { label: "HATS",           href: "/shop/hats",           live: false },
  { label: "BEANIES",        href: "/shop/beanies",        live: false },
  { label: "SOCKS",          href: "/shop/socks",          live: false },
  { label: "SCARVES",        href: "/shop/scarfs",         live: false },
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
  const { count: cartCount, open: openCart } = useCart();
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

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
            ? "1px solid rgba(201,169,97,0.45)"
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
            {/* Logo icon — Hollow Ronin gold emblem */}
            <img
              className="hr-nav-emblem"
              src="/logos/hollow-ronin-emblem.svg"
              alt="Hollow Ronin"
              style={{
                width: 60,
                height: 60,
                display: "block",
                flexShrink: 0,
              }}
            />

            {/* Wordmark */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              gap: "2px",
            }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "20px",
                color: "rgba(245,240,232,0.7)",
                letterSpacing: "0.32em",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
              }}>
                HOLLOW
              </span>
              {/* Thin gold separator */}
              <div style={{
                height: "1px",
                background: "linear-gradient(to right, #c9a961, rgba(201,169,97,0.1))",
                marginBottom: "1px",
              }} />
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "30px",
                color: "#c9a961",
                letterSpacing: "0.18em",
                textShadow: "0 0 20px rgba(201,169,97,0.85), 0 0 50px rgba(201,169,97,0.35), 0 2px 6px rgba(0,0,0,0.9)",
                marginTop: "-1px",
              }}>
                RONIN
              </span>
            </div>
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
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                style={{
                  ...navLinkStyle,
                  color: active ? "#c9a961" : "#a8a8a8",
                  borderBottom: active ? "1px solid #c9a961" : "1px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a961")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#c9a961" : "#a8a8a8")}
              >
                {label}
              </Link>
            );
          })}

          {/* SHOP trigger */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={openShop}
            onMouseLeave={closeShop}
          >
            {(() => {
              const shopActive = isActive("/shop");
              return (
                <Link
                  href="/shop"
                  style={{
                    ...navLinkStyle,
                    color: shopActive ? "#c9a961" : "#a8a8a8",
                    borderBottom: shopActive ? "1px solid #c9a961" : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a961")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = shopActive ? "#c9a961" : "#a8a8a8")}
                >
                  SHOP
                </Link>
              );
            })()}
          </div>

          <button
            aria-label="Cart"
            onClick={openCart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              padding: 0,
              position: "relative",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              lineHeight: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#c9a961")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#a8a8a8")
            }
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <path d="M3 4h2l2.5 12h11L21 8H6" />
              <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            {cartCount > 0 && (
              <span
                aria-label={`${cartCount} item${cartCount === 1 ? "" : "s"} in cart`}
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  minWidth: 18,
                  height: 18,
                  padding: "0 5px",
                  borderRadius: 999,
                  background: "#cc2222",
                  color: "#f0ede6",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 12px rgba(204,34,34,0.55)",
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
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              padding: 0,
              textDecoration: "none",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              lineHeight: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#c9a961")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#a8a8a8")
            }
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
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
          position: "fixed",
          top: "68px",
          left: 0,
          width: "100vw",
          background: "rgba(4,2,2,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(201,169,97,0.35)",
          borderBottom: "1px solid rgba(201,169,97,0.15)",
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
                color: "#c9a961",
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
                gap: "14px 24px",
              }}
            >
              {SHOP_CATEGORIES.map(({ label, href, live }) =>
                live ? (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setShopOpen(false)}
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "22px",
                      letterSpacing: "0.1em",
                      color: "#f0ede6",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "color 0.2s, border-color 0.2s",
                      paddingBottom: "2px",
                      borderBottom: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c9a961";
                      e.currentTarget.style.borderBottomColor = "rgba(201,169,97,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#f0ede6";
                      e.currentTarget.style.borderBottomColor = "transparent";
                    }}
                  >
                    {label}
                  </Link>
                ) : (
                  <span
                    key={label}
                    aria-disabled="true"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "22px",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.30)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "not-allowed",
                      paddingBottom: "2px",
                    }}
                  >
                    {label}
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 8,
                      letterSpacing: "0.2em",
                      color: "rgba(244,237,226,0.45)",
                      textTransform: "uppercase",
                    }}>
                      · forging
                    </span>
                  </span>
                )
              )}
            </div>
            <div style={{
              marginTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 18,
            }}>
              <Link
                href="/shop"
                onClick={() => setShopOpen(false)}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a961")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                VIEW ALL →
              </Link>
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
                color: "#a1182a",
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
                color: "#c9a961",
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
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a961")}
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
                color: "#c9a961",
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
            onClick={() => { setMenuOpen(false); openCart(); }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              position: "relative",
              display: "flex",
              alignItems: "center",
              lineHeight: 0,
            }}
            aria-label="Cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <path d="M3 4h2l2.5 12h11L21 8H6" />
              <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-6px",
                right: "-12px",
                minWidth: 18, height: 18, padding: "0 5px",
                borderRadius: 999,
                background: "#cc2222", color: "#f0ede6",
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a8a8",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              lineHeight: 0,
            }}
            aria-label="Account"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
