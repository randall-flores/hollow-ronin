interface ProductCardProps {
  unit: string;
  name: string;
  price: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function ProductCard({ unit, name, price, imageSrc, imageAlt }: ProductCardProps) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden border border-transparent hover:border-red transition-all duration-500 bg-surface">

      {/* Product image */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt || name}
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
      ) : (
        /* Placeholder when no image */
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)" }}>
          <span className="font-bebas text-[80px] text-cream/5 tracking-tight">HR</span>
        </div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(10,10,10,0.75) 100%)" }} />

      {/* Red tint on hover */}
      <div className="absolute inset-0 bg-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Info bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end mb-1">
            <p className="font-mono text-[8px] tracking-[0.2em] text-gray-dim opacity-60">{unit}</p>
            <span className="font-mono text-[10px] tracking-[0.15em] text-cream">{price}</span>
          </div>
          <div className="h-px w-full bg-red opacity-50" />
          <h3 className="font-bebas text-2xl text-cream mt-1">{name}</h3>
        </div>
      </div>

      {/* Quick add — slides up on hover */}
      <div className="absolute bottom-0 left-0 w-full bg-cream py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center items-center">
        <button className="font-mono text-[10px] tracking-widest text-void hover:text-red transition-colors">
          QUICK_ADD_TO_CART
        </button>
      </div>
    </div>
  );
}
