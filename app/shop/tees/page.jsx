import ProductShellPage from "@/components/ProductShellPage";

export const metadata = {
  title: "Tees · The Armory",
  description:
    "Drop 004 — Weathered Exile. Mineral wash Colortone 1300 tees, garment-dyed, oversized. Limited print run.",
  alternates: { canonical: "/shop/tees" },
};

export const revalidate = 3600;

export default function TeesPage() {
  return (
    <ProductShellPage
      title="TEES"
      subtitle="DROP 004 // WEATHERED EXILE"
      category="tees"
    />
  );
}
