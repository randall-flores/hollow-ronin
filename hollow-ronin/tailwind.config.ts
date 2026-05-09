import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black:    "#0a0a0a",
        offwhite: "#f0ede6",
        red:      "#c0001e",
        "red-dim":"#7a0012",
        gray:     "#1c1c1c",
        "gray-mid":"#2e2e2e",
        "gray-lt": "#808080",
      },
      fontFamily: {
        display: ["'Big Shoulders Display'", "sans-serif"],
        ui:      ["'Chakra Petch'", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem",  { lineHeight: "0.9" }],
        "11xl": ["12rem",  { lineHeight: "0.88" }],
        "12xl": ["14rem",  { lineHeight: "0.85" }],
        "hero": ["clamp(5rem, 14vw, 14rem)", { lineHeight: "0.88" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.02em",
        widest:   "0.2em",
        ultra:    "0.35em",
      },
      borderColor: {
        DEFAULT: "#2e2e2e",
      },
      animation: {
        "fade-up":  "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":  "fadeIn 1s ease both",
        marquee:    "marquee 18s linear infinite",
        glitch:     "glitch 6s infinite",
        blink:      "blink 1s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        glitch: {
          "0%, 95%, 100%": { clipPath: "none", transform: "none" },
          "96%": { clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)", transform: "translate(-3px, 2px)" },
          "97%": { clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)", transform: "translate(3px, -2px)" },
          "98%": { clipPath: "polygon(0 40%, 100% 40%, 100% 60%, 0 60%)", transform: "translate(-2px, 1px)" },
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
