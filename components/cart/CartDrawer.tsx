"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { items, isOpen, close, subtotal, remove, setQty } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden
        style={{
          position:        "fixed",
          inset:           0,
          background:      "rgba(0,0,0,0.72)",
          backdropFilter:  isOpen ? "blur(6px)" : "none",
          opacity:         isOpen ? 1 : 0,
          pointerEvents:   isOpen ? "auto" : "none",
          transition:      "opacity 0.35s ease, backdrop-filter 0.35s ease",
          zIndex:          300,
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        style={{
          position:      "fixed",
          top:           0,
          right:         0,
          width:         "min(440px, 96vw)",
          height:        "100vh",
          background:    "linear-gradient(180deg, #0a0707 0%, #0a0a0a 60%)",
          borderLeft:    "1px solid rgba(204,34,34,0.25)",
          boxShadow:     "-40px 0 80px -20px rgba(0,0,0,0.8)",
          transform:     isOpen ? "translateX(0)" : "translateX(100%)",
          transition:    "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          zIndex:        310,
          display:       "flex",
          flexDirection: "column",
          color:         "#f0ede6",
        }}
      >
        {/* Header */}
        <header style={{
          padding:        "26px 28px 20px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          borderBottom:   "1px solid rgba(255,255,255,0.06)",
        }}>
          <div>
            <p style={{
              margin: 0, fontFamily: "'Space Mono', monospace",
              fontSize: 9, letterSpacing: 5,
              color: "rgba(204,34,34,0.85)",
              textTransform: "uppercase",
            }}>
              ⟁ &nbsp; HOLLOW RONIN
            </p>
            <h2 style={{
              margin: "8px 0 0",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 30, letterSpacing: "0.16em",
              color: "#f0ede6",
            }}>
              THE CART
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Close cart"
            style={{
              background: "none", border: "1px solid rgba(255,255,255,0.12)",
              color: "#f0ede6", width: 36, height: 36,
              cursor: "pointer", fontSize: 16,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#cc2222";
              (e.currentTarget as HTMLButtonElement).style.color       = "#cc2222";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLButtonElement).style.color       = "#f0ede6";
            }}
          >
            ✕
          </button>
        </header>

        {/* Items / empty */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {items.length === 0 ? (
            <EmptyState onClose={close} />
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.size}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "84px 1fr",
                    gap: 16,
                    paddingBottom: 20,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{
                    position: "relative",
                    width: 84, height: 84,
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    overflow: "hidden",
                  }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="84px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ minWidth: 0 }}>
                        <p style={{
                          margin: 0, fontFamily: "Georgia, serif",
                          fontSize: 14, color: "#f0ede6", lineHeight: 1.2,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {item.name}
                        </p>
                        <p style={{
                          margin: "4px 0 0",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 9, letterSpacing: 3,
                          color: "rgba(255,255,255,0.4)",
                        }}>
                          SIZE {item.size}
                        </p>
                      </div>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 11, color: "#f0ede6",
                        whiteSpace: "nowrap",
                      }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, border: "1px solid rgba(255,255,255,0.1)" }}>
                        <QtyBtn onClick={() => setQty(item.slug, item.size, item.qty - 1)} label="−" />
                        <span style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 11, padding: "0 10px", color: "#f0ede6",
                        }}>{item.qty}</span>
                        <QtyBtn onClick={() => setQty(item.slug, item.size, item.qty + 1)} label="+" />
                      </div>

                      <button
                        onClick={() => remove(item.slug, item.size)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 9, letterSpacing: 3,
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#cc2222")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)")}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer style={{
            borderTop: "1px solid rgba(204,34,34,0.18)",
            padding:    "22px 28px 28px",
            background: "rgba(0,0,0,0.4)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: 4,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}>
                Subtotal
              </span>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26, letterSpacing: "0.08em",
                color: "#f0ede6",
              }}>
                ${subtotal.toFixed(2)} USD
              </span>
            </div>
            <p style={{
              margin: "0 0 18px",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: 12, color: "rgba(255,255,255,0.4)",
            }}>
              Shipping &amp; taxes calculated at checkout.
            </p>
            <button
              onClick={() => console.log("Checkout flow not yet implemented")}
              style={{
                width: "100%",
                background: "#cc2222",
                color: "#f0ede6",
                border: "none",
                padding: "16px",
                fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 5,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s, box-shadow 0.2s",
                boxShadow: "0 0 0 0 rgba(204,34,34,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#e62a2a";
                (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 0 28px -6px rgba(204,34,34,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#cc2222";
                (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 0 0 0 rgba(204,34,34,0)";
              }}
            >
              Checkout →
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

function QtyBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none", border: "none", cursor: "pointer",
        width: 26, height: 26,
        color: "rgba(255,255,255,0.6)",
        fontFamily: "'Space Mono', monospace", fontSize: 14,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#cc2222")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)")}
    >
      {label}
    </button>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 22, padding: "60px 12px", textAlign: "center",
    }}>
      <div style={{
        width: 64, height: 64,
        border: "1px solid rgba(204,34,34,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Georgia, serif",
        fontSize: 32, color: "rgba(204,34,34,0.7)",
      }}>
        ⌖
      </div>
      <p style={{
        margin: 0,
        fontFamily: "Georgia, serif", fontStyle: "italic",
        fontSize: 15, color: "rgba(255,255,255,0.55)",
        maxWidth: 260, lineHeight: 1.6,
      }}>
        The cart is silent.
      </p>
      <Link
        href="/shop"
        onClick={onClose}
        style={{
          marginTop: 8,
          padding: "12px 22px",
          border: "1px solid #cc2222",
          color: "#cc2222",
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 5,
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "background 0.25s, color 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#cc2222";
          (e.currentTarget as HTMLAnchorElement).style.color      = "#f0ede6";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.color      = "#cc2222";
        }}
      >
        Browse The Drop →
      </Link>
    </div>
  );
}
