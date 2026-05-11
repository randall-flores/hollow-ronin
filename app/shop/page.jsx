import Link from "next/link";
import { PRODUCTS, getProductsByCategory } from "@/lib/products";

const CATEGORIES = [
  { label: "SHIRTS",       slug: "shirts",         href: "/shop/shirts" },
  { label: "HOODIES",      slug: "hoodies",        href: "/shop/hoodies" },
  { label: "HOODED MASKS", slug: "masked-hoodies", href: "/shop/masked-hoodies" },
  { label: "HATS",         slug: "hats",           href: "/shop/hats" },
  { label: "BEANIES",      slug: "beanies",        href: "/shop/beanies" },
  { label: "SOCKS",        slug: "socks",          href: "/shop/socks" },
  { label: "SCARFS",       slug: "scarfs",         href: "/shop/scarfs" },
];

export default function ShopPage() {
  const total = PRODUCTS.length;

  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#ffffff" }}>
      <style>{`
        @keyframes hr-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .shop-cat {
          opacity: 0;
          animation: hr-fade-up 0.7s ease-out forwards;
          display: block;
          padding: 36px 28px;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: border-color 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .shop-cat::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 120%, rgba(204,34,34,0.25) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.5s ease;
          z-index: 0;
        }
        .shop-cat:hover {
          border-color: rgba(204,34,34,0.6);
          transform: translateY(-3px);
        }
        .shop-cat:hover::before { opacity: 1; }
        .shop-cat > * { position: relative; z-index: 1; }
        .shop-cat .arrow {
          position: absolute; bottom: 24px; right: 24px;
          font-family: '"Space Mono", monospace';
          font-size: 10px; letter-spacing: 4px;
          color: rgba(255,255,255,0.18);
          transition: color 0.3s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .shop-cat:hover .arrow {
          color: #cc2222;
          transform: translateX(4px);
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          minHeight: 380,
          paddingTop: 120,
          paddingBottom: 60,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(204,34,34,0.16) 0%, rgba(8,8,8,0) 60%), #080808",
          borderBottom: "1px solid rgba(204,34,34,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p style={{
          margin: '0 0 18px', fontSize: 10, letterSpacing: 8,
          color: 'rgba(204,34,34,0.85)', fontFamily: '"Space Mono", monospace',
          textTransform: 'uppercase',
        }}>
          ⟁ &nbsp; THE FULL ARMORY &nbsp; ⟁
        </p>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(64px, 9vw, 124px)",
            color: "#f0ede6",
            letterSpacing: "0.14em",
            margin: 0,
            lineHeight: 1,
            textShadow: '0 0 40px rgba(204,34,34,0.18)',
          }}
        >
          SHOP
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.4em",
            color: "#888",
            textTransform: "uppercase",
            marginTop: 22,
          }}
        >
          DROP 001 // VOID COLLECTION · {total} live pieces
        </p>
      </section>

      {/* Category grid */}
      <section style={{ padding: "80px 32px 120px", maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {CATEGORIES.map(({ label, slug, href }, i) => {
            const count  = getProductsByCategory(slug).length;
            const isLive = count > 0;
            return (
              <Link
                key={label}
                href={href}
                className="shop-cat"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 30,
                    color: "#f0ede6",
                    letterSpacing: "0.08em",
                    marginBottom: 10,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 9,
                    letterSpacing: "0.25em",
                    color: isLive ? "#cc2222" : "#555",
                    textTransform: "uppercase",
                  }}
                >
                  {isLive ? `${count} pieces · live` : "Drop 002 · soon"}
                </div>
                <span className="arrow">→</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
