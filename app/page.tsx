import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/layout/Ticker";
import ProductGrid from "@/components/product/ProductGrid";
import BrandStatement from "@/components/ui/BrandStatement";
import EmailCapture from "@/components/ui/EmailCapture";

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ───────────────────────────────────── */}
      <HeroSection />

      {/* ── TICKER ─────────────────────────────────── */}
      <Ticker />

      {/* ── PRODUCTS ───────────────────────────────── */}
      <ProductGrid />

      {/* ── BRAND STATEMENT ────────────────────────── */}
      <BrandStatement />

      {/* ── EMAIL CAPTURE ───────────────────────────── */}
      <EmailCapture />
    </main>
  );
}
