"use client";

interface ProductCardProps {
  index: number;
  name: string;
  price: string;
  tag: string;
  description: string;
}

export default function ProductCard({ index, name, price, tag, description }: ProductCardProps) {
  const patterns = [
    `radial-gradient(circle at 30% 70%, #7a0012 0%, transparent 50%),
     radial-gradient(circle at 70% 20%, #1c1c1c 0%, transparent 60%),
     linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 100%)`,
    `linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 40%, #7a0012 100%)`,
    `radial-gradient(ellipse at center, #2e2e2e 0%, #0a0a0a 70%),
     linear-gradient(180deg, #1c1c1c 0%, #0a0a0a 100%)`,
  ];

  return (
    <div
      className="group relative cursor-pointer"
      tabIndex={0}
      role="article"
      aria-label={`${name} — ${price}`}
    >
      {/* Card image area */}
      <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 border border-gray-mid transition-colors duration-500 group-hover:border-red group-focus-within:border-red">
        {/* Gradient placeholder */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
          style={{ background: patterns[index % 3] }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg, transparent, transparent 30px, rgba(240,237,230,0.1) 30px, rgba(240,237,230,0.1) 31px
            ), repeating-linear-gradient(
              90deg, transparent, transparent 30px, rgba(240,237,230,0.1) 30px, rgba(240,237,230,0.1) 31px
            )`,
          }}
        />

        {/* Monogram */}
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div
            className="font-display text-6xl text-offwhite opacity-[0.08] transition-opacity duration-500 group-hover:opacity-25 group-focus-within:opacity-25 select-none"
            style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900 }}
          >
            HR
          </div>
        </div>

        {/* Tag — top left */}
        <div className="absolute top-3 left-3">
          <span className="label text-[9px] bg-red text-offwhite px-2 py-1">{tag}</span>
        </div>

        {/* Index — top right */}
        <div className="absolute top-3 right-3" aria-hidden="true">
          <span className="label text-[9px] text-gray-lt">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Quick add — always visible on mobile, slides up on hover/focus on desktop */}
        <div className="absolute bottom-0 left-0 right-0 bg-offwhite px-4 py-3 transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
          <button
            className="label text-black text-[10px] w-full text-center hover:text-red transition-colors cursor-pointer"
            aria-label={`Quick add ${name} — ${price}`}
          >
            Quick Add — {price}
          </button>
        </div>
      </div>

      {/* Card info */}
      <div className="px-0.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p
              className="font-display text-xl text-offwhite leading-tight"
              style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 800 }}
            >
              {name}
            </p>
            <p className="label text-gray-lt text-[10px] mt-1">{description}</p>
          </div>
          <span
            className="label text-[11px] font-semibold shrink-0"
            style={{ color: "#f0ede6", letterSpacing: "0.04em" }}
          >
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
