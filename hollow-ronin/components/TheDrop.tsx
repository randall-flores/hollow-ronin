import Link from "next/link";
import Image from "next/image";
import { getProduct, type Product, type Clan } from "@/lib/products";

const FEATURED_SLUGS = [
  "ryujin-dragon-vow",
  "akuma-no-ikari-mask-of-wrath",
  "karada-nashi-hollow-warrior",
  "kurokitsune-vow-keeper",
  "shinigami-reaper",
  "arashi-maru-stormchild",
  "karasu-tengu-sentinel",
  "mu-no-kamen-mask-of-stillness",
];

const CLAN_LABEL: Record<Clan, string> = {
  Akatsuki:    "AKATSUKI",
  Yami:        "YAMI",
  Kage:        "KAGE",
  Protagonist: "NAMELESS",
};

const CLAN_CLASS: Record<Clan, string> = {
  Akatsuki:    "hr-clan-badge hr-clan-akatsuki",
  Yami:        "hr-clan-badge hr-clan-yami",
  Kage:        "hr-clan-badge hr-clan-kage",
  Protagonist: "hr-clan-badge hr-clan-protagonist",
};

export default function TheDrop() {
  const featured = FEATURED_SLUGS
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <section
      id="the-drop"
      style={{
        position:   "relative",
        background: "#0A0A0A",
        padding:    "140px 32px 160px",
        overflow:   "hidden",
        borderTop:    "1px solid rgba(201,160,39,0.20)",
        borderBottom: "1px solid rgba(201,160,39,0.10)",
      }}
    >
      <style>{`
        .td-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1440px;
          margin: 0 auto;
        }
        @media (max-width: 1180px) { .td-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 860px)  { .td-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .td-grid { grid-template-columns: 1fr; } }

        .td-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 36px;
          border: 1px solid #C9A027;
          color: #C9A027;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .td-cta:hover { background: #C9A027; color: #0A0A0A; }
      `}</style>

      {/* Header */}
      <header
        style={{
          maxWidth: 1440, margin: "0 auto 64px",
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'DM Mono', monospace",
            fontSize:   11,
            letterSpacing: "0.3em",
            color: "#C9A027",
            textTransform: "uppercase",
          }}
        >
          Drop 001 — The Void Collection
        </p>

        <h2
          style={{
            margin: "20px 0 0",
            fontFamily: "'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 8vw, 96px)",
            letterSpacing: "0.06em",
            lineHeight: 0.95,
            color: "#F4EDE2",
            textTransform: "uppercase",
          }}
        >
          The Thirteen
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
          <div style={{ width: 36, height: 1, background: "rgba(201,160,39,0.55)" }} />
          <span
            style={{
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: "italic",
              fontSize: 14,
              color: "rgba(244,237,226,0.7)",
            }}
          >
            Twelve walk the broken roads.
          </span>
          <div style={{ width: 36, height: 1, background: "rgba(201,160,39,0.55)" }} />
        </div>
      </header>

      {/* Grid */}
      <div className="td-grid">
        {featured.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            prefetch={false}
            className="hr-card"
          >
            <div className="hr-card-media">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                fill
                sizes="(min-width: 1180px) 25vw, (min-width: 860px) 33vw, (min-width: 480px) 50vw, 100vw"
              />
              <div className="hr-card-cta">Acquire →</div>
            </div>

            <div
              style={{
                padding: "20px 22px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span className={CLAN_CLASS[product.clan]}>{CLAN_LABEL[product.clan]}</span>

              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: "0.05em",
                  color: "#F4EDE2",
                  lineHeight: 1.2,
                }}
              >
                {product.japaneseName}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(244,237,226,0.5)",
                }}
              >
                {product.title}
              </p>

              <p
                style={{
                  margin: "4px 0 0",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: "#C9A027",
                }}
              >
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
        <Link href="/shop" className="td-cta">
          Enter the Armory →
        </Link>
      </div>
    </section>
  );
}
