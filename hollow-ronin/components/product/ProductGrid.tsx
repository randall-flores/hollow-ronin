import ProductCard from "./ProductCard";

const PLACEHOLDER_PRODUCTS = [
  {
    name: "Ronin Oversized Tee",
    price: "$45",
    tag: "DROP 001",
    description: "Heavyweight 280gsm — Cyber Samurai Graphic",
  },
  {
    name: "Void Hoodie",
    price: "$90",
    tag: "LIMITED",
    description: "Brushed Fleece — Embroidered Back Panel",
  },
  {
    name: "No Master Cap",
    price: "$38",
    tag: "DROP 001",
    description: "6-Panel Structured — Embroidered Kanji",
  },
];

export default function ProductGrid() {
  return (
    <section className="bg-black px-6 md:px-10 py-20 md:py-28">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12 border-b border-gray-mid pb-6">
        <div>
          <p className="label text-red mb-2">— Featured</p>
          <h2
            className="font-display text-5xl md:text-7xl text-offwhite"
            style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900 }}
          >
            Drop 001
          </h2>
        </div>
        <a
          href="/shop"
          className="label text-[10px] text-gray-lt hover:text-red transition-colors hidden md:block"
        >
          View All →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PLACEHOLDER_PRODUCTS.map((product, i) => (
          <ProductCard
            key={i}
            index={i}
            name={product.name}
            price={product.price}
            tag={product.tag}
            description={product.description}
          />
        ))}
      </div>

      {/* Mobile view all */}
      <div className="mt-10 md:hidden text-center">
        <a href="/shop" className="label text-[10px] text-gray-lt hover:text-red transition-colors">
          View All Products →
        </a>
      </div>
    </section>
  );
}
