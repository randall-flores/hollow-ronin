import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/layout/Ticker";
import TheDrop from "@/components/TheDrop";
import TheCode from "@/components/ui/TheCode";
import BrandStatement from "@/components/ui/BrandStatement";
import TheOrder from "@/components/ui/TheOrder";
import CountdownTimer from "@/components/CountdownTimer";

export const metadata: Metadata = {
  title: {
    absolute: "Hollow Ronin — Cyber-samurai streetwear. Drop-based. Limited by design.",
  },
  description:
    "Hollow Ronin — Cyber-samurai streetwear. Drop-based. Limited by design. DROP 001 now live.",
  alternates: { canonical: "/" },
  openGraph: {
    title:       "Hollow Ronin — Cyber-samurai streetwear",
    description: "Drop-based. Limited by design. DROP 001 now live.",
    url:         "/",
  },
};

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
          borderTop: "1px solid rgba(201,169,97,0.18)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.4em",
            color: "rgba(201,169,97,0.80)",
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
