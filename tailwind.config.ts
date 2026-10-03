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
        official: {
          navy: "#0A2540",
          navyDark: "#071A2E",
          navyLight: "#123962",
          blue: "#1D4ED8",
          blueLight: "#2563EB",
          sky: "#EBF3FA",
          red: "#C53030",
          redDark: "#9B2C2C",
          graphite: "#1E293B",
          muted: "#64748B",
          border: "#E2E8F0",
          bgLight: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
