import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#591BDC',
        'primary-light': '#EEE5FF',
        'secondary': '#FF7900',
        'gray-7': '#777777',
        'gray-6': '#666666',
        'gray-5': '#555555',
        'gray-4': '#444444',
        'gray-3': '#333333',
        'gray-2': '#222222',
        'gray-1': '#1d1d1d',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
        '8xl': '1300px'
      }
    },
  },
  plugins: [],
}
export default config
