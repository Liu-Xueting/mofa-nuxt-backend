import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    formatters: true,
    markdown: false,
    typescript: {
      tsconfigPath: './server/tsconfig.json',
    },
    vue: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
  },
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'curly': ['error', 'all'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'ts/strict-boolean-expressions': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-argument': 'off',
      'ts/no-unsafe-return': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-floating-promises': 'off',
      'ts/no-misused-promises': 'off',
    },
  },
)
