/* eslint-disable ts/unbound-method */
import plugin from 'tailwindcss/plugin'

/**
 * 额外的 Tailwind CSS 工具类
 */
export const commonUtilities = plugin(({ addUtilities }) => {
  addUtilities({
    '.flex-center': {
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    },
    '.size-page': {
      width: 'calc(100vw - var(--sidebar-width) - 2.5rem)',
    },
  })
}, ['responsive', 'hover'])
