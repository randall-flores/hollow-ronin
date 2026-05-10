import ProductCard from "./ProductCard";

const PRODUCTS = [
  {
    unit: "UNIT_01",
    name: "RONIN_SHELL_HOODIE",
    price: "$480.00",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG7AW9cCMwyUhx8C6SU-OXFlThmxuwLSqkWUqj9iI2OTt3za9G8o7D6iuhxy_cSPCwH-cLEVRYCRqjtS9RTgbw_ti0liIpl8ZQ3zGGF1cTzw6vkSS56n9LN2FWb0vHlyH3Y1vPkDUsDHckDLb5JbzO96qjW0ZblPSmg7ljS6F1aSsbiVo-8UVhialXDGIZyP0DVg6M3i8aj2MxdG2L1qr3EjYRvSZ0iNtiSfZmyvTAhEhZSYyts49yP9x1PMHEhP3oJxiQTLfevp8",
    stock: 3,
  },
  {
    unit: "UNIT_02",
    name: "TACTICAL_CARGO_P01",
    price: "$320.00",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ7z_kUNfEC8fhTnrq557BZAsJa2xiIwATL3EAIF5u_UaD0ogtIGdk60725WEbt0QOSn57YpYM-NyiZ32w6b0RVHFM4Dg5VY1NcWmrsyVZpqF1ltNq8v6ZVqFaYzeUWapieY4E7S5T9LBq6ayVSm3UoIfRtLVBvbb0IIf3PuPr06RHXTvUz3Xba1lrCkxYPvOjx3Cnn6AcKhKmkqXtiOqZTnBgqO4o-dIF3jVE0SOpXff9Rx4ED0W-YRlys4UNM6Bun5ujYmfDx5I",
    stock: null,
  },
  {
    unit: "UNIT_03",
    name: "KABUTO_OVERCOAT",
    price: "$750.00",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu0FiO3cVOVNzsw9TdCcIjCMV_M56m4a1ULL3kq0Ww2aUPfxKHjNR2I8kMaJ8yWKxbyYUPSSdhTTLzXAyz-3LYUbCA7bRsnzXLdu_JDwmtL-DdqBOW7CZfIIEyYbYUzQ3eSopJnDtJOZtHJd3bN1_Xj2F2ph_32I4Xykb4POt_VvKrErg5ZpHzGB-Lka9EZuzE8_X93q5-PU7l9ve6607fG6SfCWeqMGpiIQCIZ6ePqQNAczOWHLf__eW2nMP1e7pfiEH372O3bNI",
    soldOut: true,
    stock: null,
  },
];

export default function ProductGrid() {
  return (
    <section style={{ padding: "160px 48px" }} className="product-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px" }} className="product-header">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c0001e" }}>CATALOGUE_01</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px", lineHeight: "40px", letterSpacing: "0.05em", color: "#f0ede6" }}>CORE_EQUIPMENT</h2>
        </div>
        <a href="/shop" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4c7c7", textDecoration: "none", borderBottom: "1px solid rgba(196,199,199,0.3)", paddingBottom: "4px" }}>
          VIEW_ALL_ITEMS
        </a>
      </div>

      <div className="product-grid">
        {PRODUCTS.map(p => <ProductCard key={p.unit} {...p} />)}
      </div>
    </section>
  );
}
