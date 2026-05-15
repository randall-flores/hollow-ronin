import type { Metadata } from "next";
import { Space_Mono, Bebas_Neue, Inter, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SlashCursor from "@/components/SlashCursor";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight:  ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight:  "400",
  display: "swap",
  variable: "--font-bebas-neue",
});

const inter = Inter({
  subsets: ["latin"],
  weight:  ["400", "700"],
  display: "swap",
  variable: "--font-inter",
});

const anton = Anton({
  subsets: ["latin"],
  weight:  "400",
  display: "swap",
  variable: "--font-anton",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hollowronin.com";
const OG_IMAGE = "/og/og-default.png";

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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Hollow Ronin · DROP 001" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Hollow Ronin — Cyber-samurai streetwear",
    description: "Drop-based. Limited by design.",
    images:      [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg",        type: "image/svg+xml" },
      { url: "/favicon-32x32.png",  type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${bebasNeue.variable} ${inter.variable} ${anton.variable}`}
    >
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
