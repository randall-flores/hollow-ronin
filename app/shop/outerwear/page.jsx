import ProductShellPage from "@/components/ProductShellPage";

export const metadata = {
  title: "Outerwear · The Armory",
  description:
    "Packable shells for the long walk. The Drifter collection — built for the road that has no end.",
  alternates: { canonical: "/shop/outerwear" },
};

export const revalidate = 3600;

export default function OuterwearPage() {
  return (
    <ProductShellPage
      title="OUTERWEAR"
      subtitle="DRIFTER COLLECTION"
      category="outerwear"
    />
  );
}
