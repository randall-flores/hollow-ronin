import ProductCard from "./ProductCard";

const PRODUCTS = [
  { unit: "UNIT_01", name: "RONIN_SHELL_HOODIE",  price: "$480.00" },
  { unit: "UNIT_02", name: "TACTICAL_CARGO_P01",  price: "$320.00" },
  { unit: "UNIT_03", name: "KABUTO_OVERCOAT",     price: "$750.00" },
];

export default function ProductGrid() {
  return (
    <section style={{ padding: "96px 48px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #2e2e2e", paddingBottom: "24px", marginBottom: "48px" }}>
        <div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c0001e", display: "block", marginBottom: "8px" }}>CATALOGUE_01</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#f0ede6", letterSpacing: "-0.01em" }}>CORE_EQUIPMENT</h2>
        </div>
        <a href="/shop" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b6b", textDecoration: "none", borderBottom: "1px solid rgba(110,110,110,0.3)", paddingBottom: "4px" }}>
          VIEW_ALL_ITEMS
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(68,71,72,0.2)" }}>
        {PRODUCTS.map(p => <ProductCard key={p.unit} {...p} />)}
      </div>
    </section>
  );
}
