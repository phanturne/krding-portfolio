import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theaterBg: "#070b14",
        cardNavy: "#0e1628",
        screenDark: "#050811",
        iceWhite: "#f8fafc",
        slateMuted: "#94a3b8",
        skyLight: "#fde68a",
        primeCyan: "#f59e0b",
        electricBlue: "#f472b6",
        mintTeal: "#fbbf24",
        borderNavy: "#1e293b",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
