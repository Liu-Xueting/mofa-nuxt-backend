import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import { commonUtilities } from './config/tailwindcss'

export default <Config>{
  content: [],
  plugins: [
    daisyui,
    typography(),
    commonUtilities,
  ],
  daisyui: {
    logs: false,
    themes: false,
  },
  theme: {
    fontSize: {
      'sm': ['12px', '16px'],
      'base': ['14px', '22px'],
      'lg': ['20px', '28px'],
      'xl': ['24px', '32px'],
      '2xl': ['1.5rem', {
        lineHeight: '2rem',
        letterSpacing: '-0.01em',
        fontWeight: '500',
      }],
      '3xl': ['1.875rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
    },
  },
}
