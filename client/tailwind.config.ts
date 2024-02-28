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
        'nevada': {
          '50': '#f5f6f6',
          '100': '#e5e6e8',
          '200': '#ced0d3',
          '300': '#acafb4',
          '400': '#83878d',
          '500': '#686c72',
          '600': '#595c61',
          '700': '#4c4e52',
          '800': '#434447',
          '900': '#3b3c3e',
          '950': '#252627',
      },
      'tango': {
        '50': '#fef7ee',
        '100': '#fceed8',
        '200': '#f8d8b0',
        '300': '#f3bc7e',
        '400': '#ed964a',
        '500': '#e87722',
        '600': '#da611c',
        '700': '#b54a19',
        '800': '#903b1c',
        '900': '#74331a',
        '950': '#3f170b',
    },
      }
     
    
    },
  },
  plugins: [],
};
export default config;
