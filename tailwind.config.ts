import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        bone:     "#F4EDE2",
        blood:    "#A1182A",
        kintsugi: "#C9A027",
        bamboo:   "#1C3A2A",
        ash:      "#2A2A2A",

        // Backwards-compat aliases
        void:    "#0A0A0A",
        cream:   "#F4EDE2",
        red:     "#A1182A",
        surface: "#2A2A2A",
        "surface-low":  "#1c1b1b",
        "surface-high": "#2A2A2A",
        "gray-dim":     "#6B6B6B",
        "gray-outline": "#444748",
      },
      fontFamily: {
        display: ["'Shippori Mincho'", "'Noto Serif JP'", "Georgia", "serif"],
        ui:      ["'DM Mono'", "'Space Mono'", "ui-monospace", "monospace"],
        // Compat aliases — old code still imports these names
        bebas:   ["'Shippori Mincho'", "'Noto Serif JP'", "Georgia", "serif"],
        mono:    ["'DM Mono'", "'Space Mono'", "ui-monospace", "monospace"],
        body:    ["'DM Mono'", "'Space Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm:   "0",
        DEFAULT: "0",
        md:   "0",
        lg:   "0",
        xl:   "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      spacing: {
        "page": "48px",
        "section": "160px",
      },
      animation: {
        ticker:   "ticker 22s linear infinite",
        "fade-up":"fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":"fadeIn 1s ease both",
        blink:    "blink 1.2s step-end infinite",
        shimmer:  "shimmer 1.4s ease-out forwards",
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)"  },
        },
      },
    },
  },
  plugins: [],
};

export default config;
