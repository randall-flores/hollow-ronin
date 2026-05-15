import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SlashCursor from "@/components/SlashCursor";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hollowronin.com";
const OG_IMAGE = "/mockups/tee-cyber-oni-clash-back-black-model3.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  "Hollow Ronin — Cyber-samurai streetwear. Drop-based. Limited by design.",
    template: "%s · HOLLOW RONIN",
  },
  description:
    "Hollow Ronin — Cyber-samurai streetwear. Drop-based. Limited by design.",
  keywords: [
    "Hollow Ronin", "cyber-samurai streetwear", "Japanese streetwear",
    "ronin clothing", "yokai apparel", "limited drop", "DROP 001",
    "cyberpunk streetwear", "samurai tees",
  ],
  openGraph: {
    type:        "website",
    siteName:    "HOLLOW RONIN",
    title:       "Hollow Ronin — Cyber-samurai streetwear. Drop-based. Limited by design.",
    description: "Six garments. Six ghosts. Cut once, then never again.",
    url:         SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 1200, alt: "Hollow Ronin · DROP 001" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Hollow Ronin — Cyber-samurai streetwear",
    description: "Drop-based. Limited by design.",
    images:      [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo-mask.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@700&family=Inter:wght@400;700&family=Space+Mono:wght@400;700&family=Anton&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+JP:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <div style={{ paddingTop: "68px" }}>
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </div>
          <CartDrawer />
          <SlashCursor />
        </CartProvider>
      </body>
    </html>
  );
}
