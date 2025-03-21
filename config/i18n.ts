import type { NuxtConfig } from 'nuxt/schema'

export const Languages = ['zh-CN', 'en-US'] as const

export const projectI18nConfig = {
  defaultLocale: 'zh-CN',
  detectBrowserLanguage: {
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    useCookie: true,
  },
  locales: [
    {
      code: 'en-US',
      language: 'en-US',
      name: 'English',
      file: 'en-US.yaml',
    },
    {
      code: 'zh-CN',
      language: 'zh-CN',
      name: '简体中文',
      file: 'zh-CN.yaml',
    },
  ],
  lazy: true,
  langDir: 'app/assets/i18n/',
  restructureDir: '.',
  strategy: 'no_prefix',
  experimental: {
    localeDetector: 'config/locale-detector.ts',
  },
} satisfies NuxtConfig['i18n']
