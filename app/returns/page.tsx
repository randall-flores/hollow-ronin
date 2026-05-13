import type { Metadata } from "next";
import PolicyPage from "@/components/layout/PolicyPage";

export const metadata: Metadata = {
  title:       "Returns",
  description: "Hollow Ronin returns policy.",
  alternates:  { canonical: "/returns" },
};

export default function Page() {
  return (
    <PolicyPage
      eyebrow="POLICY · 返品"
      title="RETURNS"
      intro="Returns policy is being forged. Unworn garments returnable within 14 days of delivery. Drops are limited — once cut, they do not return to the void."
    />
  );
}
