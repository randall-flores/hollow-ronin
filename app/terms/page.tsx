import type { Metadata } from "next";
import PolicyPage from "@/components/layout/PolicyPage";

export const metadata: Metadata = {
  title:       "Terms of Service",
  description: "Hollow Ronin terms of service.",
  alternates:  { canonical: "/terms" },
};

export default function Page() {
  return (
    <PolicyPage
      eyebrow="POLICY · 利用規約"
      title="TERMS"
      intro="Terms of service is being forged. By entering the void you agree to wear what you bought, walk how you walk, and break no laws of physics. Full terms incoming."
    />
  );
}
