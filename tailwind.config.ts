import type { Config } from 'tailwindcss'
import formsPlugin from '@tailwindcss/forms'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        natume: ['Natume', 'sans-serif'],
      },
      fontSize: {
        // [font-size, line-height(*1.25)]
        xs: ['0.375rem', '0.46875rem'],
        '3sm': ['0.75rem', '0.9375rem'],
        '2sm': ['0.85rem', '1.0625rem'],
        sm: ['0.875rem', '1.09375rem'],
        base: ['1rem', '1.25rem'],
        lg: ['1.25rem', '1.5625rem'],
        xl: ['1.5rem', '1.875rem'],
        '2xl': ['2rem', '2.5rem'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.screen-bg': {
          // 'background-image': "url('/bg.png')",
          'background-position': 'center',
          'background-size': 'contain',
          'background-repeat': 'no-repeat',

          position: 'relative',
          width: '100%',
          'padding-top': '60.5769230769231%',
        },
        '.screen-inside': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        },
        '.screen-content': {
          width: '100%',
          height: '85.18%',
          'overflow-y': 'auto', // 縦方向のスクロール: 有効
        },

        '.fukidashi-hito': {
          'border-image-source': 'url("/fukidashi-hito.png")',
          'border-image-slice': '56 56 56 56', // 上右下左 ※残りは余白
          'border-width': '14px 14px 14px 14px',
          'border-image-repeat': 'stretch',
          'border-image-width': '1',
        },
        '.fukidashi-cat': {
          'border-image-source': 'url("/fukidashi-cat.png")',
          'border-image-slice': '56 56 56 114', // 上右下左 ※残りは余白
          'border-width': '14px 14px 14px 28.5px',
          'border-image-repeat': 'stretch',
          'border-image-width': '1',
        },
        '.fukidashi-text-hito': {
          color: '#111827',
          'background-color': '#eee3cc',
          'font-size': '24px',
          'text-align': 'center',
        },
        '.fukidashi-text-cat': {
          color: '#111827',
          'background-color': '#fff',
          'font-size': '24px',
          'text-align': 'center',
        },
      }

      addUtilities(newUtilities)
    }),

    formsPlugin,
  ],
}

export default config
