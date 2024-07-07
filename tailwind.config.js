/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial"],
      },
      colors: {
        color0: "#1e1e2e",
        color1: "#f38ba8",
        color2: "#fab387",
        color3: "#a6e3a1",
        color4: "#89dceb",
        color5: "#89b4fa",
        color6: "#cdd6f4",
        color7: "#f5e0dc",
        color8: "#45475a",
        color9: "#eba0ac",
        color10: "#f9e2af",
        color11: "#94e2d5",
        color12: "#74c7ec",
        color13: "#b4befe",
        color14: "#bac2de",
        color15: "#f2cdcd",
        brat: "#8ace00"
        // Add more custom colors as needed
      },
      //     backgroundImage: {
    //       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //       "gradient-conic":
    //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //     },
  },
},
plugins: [],
};
