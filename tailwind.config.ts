import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        dark: {
          700: "rgb(63 63 70)",
          800: "#1E1E1E",
        },
        primary: "#F24E1E",
        secondary: "#A2A2A6",
        yellow: "#F5C518",
      },
    },
  },
  plugins: [],
};
export default config;
