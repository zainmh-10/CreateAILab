import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#f6f8f5',
        foreground: '#13201c',
        accent: '#1d7a5b',
        muted: '#e5ece8',
        card: '#ffffff'
      }
    }
  },
  plugins: []
};

export default config;
