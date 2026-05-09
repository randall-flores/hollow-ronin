import ProductCard from "./ProductCard";

const PRODUCTS = [
  { unit: "UNIT_01", name: "RONIN_SHELL_HOODIE",  price: "$480.00" },
  { unit: "UNIT_02", name: "TACTICAL_CARGO_P01",  price: "$320.00" },
  { unit: "UNIT_03", name: "KABUTO_OVERCOAT",      price: "$750.00" },
];

export default function ProductGrid() {
  return (
    <section className="px-page py-24 md:py-section">
      {/* Header */}
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-red block">CATALOGUE_01</span>
          <h2 className="font-bebas text-5xl md:text-6xl text-cream">CORE_EQUIPMENT</h2>
        </div>
        <a href="/shop" className="font-mono text-[10px] tracking-[0.15em] text-gray-dim border-b border-gray-dim/30 pb-1 hover:text-red hover:border-red transition-all duration-300">
          VIEW_ALL_ITEMS
        </a>
      </div>

      {/* Grid — 1px gap acts as red grid line */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-outline/20">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.unit} {...p} />
        ))}
      </div>
    </section>
  );
}
