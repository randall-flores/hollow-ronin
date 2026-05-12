import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/layout/Ticker";
import TheDrop from "@/components/TheDrop";
import TheCode from "@/components/ui/TheCode";
import BrandStatement from "@/components/ui/BrandStatement";
import TheOrder from "@/components/ui/TheOrder";
import CountdownTimer from "@/components/CountdownTimer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Ticker />
      <section
        aria-label="Drop status"
        style={{
          background: "#08080a",
          padding: "44px 24px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          borderTop: "1px solid rgba(204,34,34,0.12)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.4em",
            color: "rgba(204,34,34,0.85)",
            textTransform: "uppercase",
          }}
        >
          DROP 001 · TRANSMISSION
        </p>
        <CountdownTimer />
      </section>
      <TheDrop />
      <TheCode />
      <BrandStatement />
      <TheOrder />
    </main>
  );
}
