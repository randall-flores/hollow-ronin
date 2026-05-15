import Link from "next/link";
import { getFamiliesByCategory } from "@/lib/product-merge";

export const metadata = {
  title: "Shop · The Armory",
  description:
    "Browse the full Hollow Ronin armory — DROP 001 // Void Collection. Shirts live now. More categories forging.",
  alternates: { canonical: "/shop" },
};

export const revalidate = 3600;

const CATEGORIES = [
  { slug: "shirts",         label: "SHIRTS",         kanji: "上着" },
  { slug: "hoodies",        label: "HOODIES",        kanji: "頭巾" },
  { slug: "masked-hoodies", label: "MASKED HOODIES", kanji: "面頭巾" },
  { slug: "hats",           label: "HATS",           kanji: "帽子" },
  { slug: "beanies",        label: "BEANIES",        kanji: "毛帽" },
  { slug: "socks",          label: "SOCKS",          kanji: "靴下" },
  { slug: "scarfs",         label: "SCARVES",        kanji: "襟巻" },
];

export default async function ShopPage() {
  const counts = await Promise.all(
    CATEGORIES.map(async (c) => {
      try {
        const families = await getFamiliesByCategory(c.slug);
        return { slug: c.slug, count: families.length };
      } catch {
        return { slug: c.slug, count: 0 };
      }
    }),
  );
  const countBySlug = Object.fromEntries(counts.map((x) => [x.slug, x.count]));

  const categories = CATEGORIES.map((c) => ({
    ...c,
    count: countBySlug[c.slug] ?? 0,
    live:  (countBySlug[c.slug] ?? 0) > 0,
  }));

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6" }}>
      <style>{`
        .shop-hero {
          padding: clamp(96px, 16vw, 140px) clamp(16px, 4vw, 32px) clamp(56px, 8vw, 80px);
          text-align: center;
          background: radial-gradient(ellipse at 50% 30%, rgba(204,34,34,0.14) 0%, #0a0a0a 65%);
          border-bottom: 1px solid rgba(204,34,34,0.20);
        }
        .shop-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px) clamp(80px, 14vw, 140px);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1px;
          background: rgba(204,34,34,0.18);
          border: 1px solid rgba(204,34,34,0.18);
        }
        .shop-cat {
          position: relative;
          background: #0c0c0c;
          padding: 56px 32px 40px;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          color: #f0ede6;
          transition: background 0.3s ease;
        }
        .shop-cat.live:hover { background: #121212; }
        .shop-cat.live:hover .shop-cat-cta { color: #c9a961; border-color: #c9a961; }
        .shop-cat.coming  { background: #080808; cursor: not-allowed; opacity: 0.55; }
        .shop-cat-kanji {
          position: absolute;
          top: 14px; right: 16px;
          font-family: serif;
          font-size: 56px;
          color: rgba(204,34,34,0.10);
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }
        .shop-cat-status {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(204,34,34,0.85);
        }
        .shop-cat.coming .shop-cat-status { color: rgba(204,34,34,0.55); }
        .shop-cat-label {
          margin: 18px 0 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 0.12em;
          color: #f0ede6;
        }
        .shop-cat-count {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
        }
        .shop-cat-cta {
          margin-top: 28px;
          align-self: flex-start;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 10px 18px;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .shop-cat.coming .shop-cat-cta {
          color: rgba(204,34,34,0.55);
          border-color: rgba(204,34,34,0.30);
        }
      `}</style>

      <section className="shop-hero">
        <p style={{
          margin: "0 0 18px",
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: "0.5em",
          color: "rgba(204,34,34,0.85)",
          textTransform: "uppercase",
        }}>
          THE ARMORY · DROP 001
        </p>
        <h1 style={{
          margin: 0,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(56px, 9vw, 104px)",
          letterSpacing: "0.10em",
          lineHeight: 1,
          color: "#f0ede6",
          textShadow: "0 0 40px rgba(204,34,34,0.18)",
        }}>
          SHOP
        </h1>
        <p style={{
          margin: "26px auto 0", maxWidth: 520,
          fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: 15, lineHeight: 1.8,
          color: "rgba(240,237,230,0.55)",
        }}>
          Thirteen characters. Three clans. One nameless. The first cut
          is open — more forms are forging in the dark.
        </p>
      </section>

      <section className="shop-grid">
        {categories.map((cat) => {
          const Inner = (
            <>
              <span className="shop-cat-kanji">{cat.kanji}</span>
              <div>
                <p className="shop-cat-status">
                  {cat.live ? "NOW LIVE" : "FORGING"}
                </p>
                <p className="shop-cat-label">{cat.label}</p>
                <p className="shop-cat-count">
                  {cat.live
                    ? `${cat.count} ${cat.count === 1 ? "piece" : "pieces"}`
                    : "Drop 002 — soon"}
                </p>
              </div>
              <span className="shop-cat-cta">
                {cat.live ? "Enter →" : "Coming soon"}
              </span>
            </>
          );

          return cat.live ? (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="shop-cat live"
              aria-label={`Shop ${cat.label}`}
            >
              {Inner}
            </Link>
          ) : (
            <div
              key={cat.slug}
              className="shop-cat coming"
              aria-disabled="true"
            >
              {Inner}
            </div>
          );
        })}
      </section>
    </main>
  );
}
