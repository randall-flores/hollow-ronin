import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void:     "#0a0a0a",
        cream:    "#f0ede6",
        red:      "#c0001e",
        surface:  "#131313",
        "surface-low":  "#1c1b1b",
        "surface-high": "#2a2a2a",
        "gray-dim":     "#8e9192",
        "gray-outline": "#444748",
        // Drop 001 cinema palette — gold is hover-only accent.
        obsidian: "#0a0a0a",
        bone:     "#f4ede2",
        blood:    "#a1182a",
        gold:     "#c9a961",
        "gold-dim": "#a88b45",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        mono:  ["'Space Mono'", "monospace"],
        body:  ["'Inter'", "sans-serif"],
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
      },
    },
  },
  plugins: [],
};

export default config;
