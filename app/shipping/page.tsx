import type { Metadata } from "next";
import PolicyPage from "@/components/layout/PolicyPage";

export const metadata: Metadata = {
  title:       "Shipping",
  description: "Hollow Ronin shipping policy — domestic + international.",
  alternates:  { canonical: "/shipping" },
};

export default function Page() {
  return (
    <PolicyPage
      eyebrow="POLICY · 配送"
      title="SHIPPING"
      intro="Shipping policy is being forged. Orders ship within 5–7 business days from the void. Domestic + international rates will appear at checkout."
    />
  );
}
