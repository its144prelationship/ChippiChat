/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "cpc-blue": "#2260FF",
        "cpc-green": "#41EAAD",
        "cpc-dark-green": "#39BE8E",
        "cpc-red": "#FF1F00",
        "cpc-light-gray": "#F7F7F7",
        "cpc-gray": "#D9D9D9",
        "cpc-orange": "#FF994E",
        "cpc-salmon-red": "#EA5F41",
        "cpc-verylight-gray": "#B0B0B0",
        "cpc-dark-red": "#C14D33",
        "cpc-light-orange" : "#FFC79E",
        "cpc-brown" : "#C46B29"
      },
      fontFamily: {
        "dm-mono": ["DM Mono", "monospace"],
        "ibm-plex-mono": ["IBM Plex Mono", "monospace", "IBM Plex Sans Thai", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".inner-shadow-2": {
          boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
        },
        ".inner-shadow-4": {
          boxShadow: "inset 4px 4px 4px rgba(0, 0, 0, 0.25)",
        },
        ".scrollbar-none": {
          "-ms-overflow-style": "none", /* Internet Explorer and Edge */
          "scrollbar-width": "none", /* Firefox */
        },
        ".scrollbar-none::-webkit-scrollbar": {
          display: "none", /* Chrome, Safari, and Opera */
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

