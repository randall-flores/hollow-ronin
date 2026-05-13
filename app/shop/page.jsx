import { redirect } from "next/navigation";

export const metadata = {
  title: "Shop · The Armory",
  description:
    "Browse the full Hollow Ronin armory — DROP 001 // Void Collection.",
  alternates: { canonical: "/shop/shirts" },
};

export default function ShopPage() {
  redirect("/shop/shirts");
}
