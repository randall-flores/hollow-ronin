import Link from "next/link";

const CATEGORIES = [
  { label: "HOODIES", href: "/shop/hoodies", count: "--" },
  { label: "SHIRTS", href: "/shop/shirts", count: "--" },
  { label: "HATS", href: "/shop/hats", count: "--" },
  { label: "BEANIES", href: "/shop/beanies", count: "--" },
  { label: "SOCKS", href: "/shop/socks", count: "--" },
  { label: "SCARFS", href: "/shop/scarfs", count: "--" },
  { label: "HOODED MASKS", href: "/shop/masked-hoodies", count: "--" },
  { label: "ALL", href: "/shop", count: "--" },
];

export default function ShopPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Hero */}
      <div
        style={{
          height: "280px",
          background:
            "radial-gradient(ellipse at center, rgba(120,10,10,0.15) 0%, #0a0a0a 70%)",
          borderBottom: "1px solid rgba(180,20,20,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "68px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "72px",
            color: "#f0ede6",
            letterSpacing: "0.12em",
            margin: 0,
          }}
        >
          SHOP
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "#555555",
            textTransform: "uppercase",
            marginTop: "12px",
          }}
        >
          ALL ITEMS // DROP 001
        </p>
      </div>

      {/* Category grid */}
      <div style={{ padding: "80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {CATEGORIES.map(({ label, href, count }) => (
            <Link key={label} href={href} className="shop-card">
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "28px",
                  color: "#f0ede6",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "#444",
                  textTransform: "uppercase",
                }}
              >
                {count} ITEMS
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
