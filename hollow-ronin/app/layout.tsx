import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SamuraiSlash from "@/components/SamuraiSlash";

export const metadata: Metadata = {
  title: "HOLLOW RONIN — No Master. No Rules.",
  description: "Fabricated in the void. Designed for the resistance. A new protocol of functional aesthetics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/hollow-ronin-logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <div style={{ paddingTop: "68px" }}>
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </div>
        <SamuraiSlash />
      </body>
    </html>
  );
}
