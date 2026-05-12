import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/layout/Ticker";
import TheDrop from "@/components/TheDrop";
import TheCode from "@/components/ui/TheCode";
import BrandStatement from "@/components/ui/BrandStatement";
import TheOrder from "@/components/ui/TheOrder";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Ticker />
      <TheDrop />
      <TheCode />
      <BrandStatement />
      <TheOrder />
    </main>
  );
}
