import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "bl-blue": "#00b5ef",
      },
      boxShadow: {
        custom: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)", // equivalent to #00000040
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
