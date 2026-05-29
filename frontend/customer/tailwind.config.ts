import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1ED",
        nude: "#E8D4C4",
        spaGreen: "#B8D8C8",
        champagne: "#F4E4D7",
        gold: "#D4A853",
        dark: "#2C2C2C",
        spa: {
          gray: "#6B6B6B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
