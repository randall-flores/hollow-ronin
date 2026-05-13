import type { Metadata } from "next";
import PolicyPage from "@/components/layout/PolicyPage";

export const metadata: Metadata = {
  title:       "Privacy Policy",
  description: "Hollow Ronin privacy policy.",
  alternates:  { canonical: "/privacy" },
};

export default function Page() {
  return (
    <PolicyPage
      eyebrow="POLICY · プライバシー"
      title="PRIVACY"
      intro="Privacy policy is being forged. We collect only what is needed to fulfill orders. We do not sell data to third parties. Full disclosure incoming."
    />
  );
}
