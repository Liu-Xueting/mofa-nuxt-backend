import process from 'node:process'
import { projectI18nConfig } from './config/i18n'
import { projectHooksConfig } from './config/project-hooks'
import { name as PROJECT_NAME, version } from './package.json'

const openapiServerURL = process.env.OPENAPI_SERVER_URL || 'http://localhost:3000'

/// keep-sorted
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    layoutTransition: { mode: 'out-in', name: 'layout' },
    pageTransition: { mode: 'out-in', name: 'page' },
  },

  auth: {
    isEnabled: true,
    originEnvKey: 'NUXT_AUTH_ORIGIN',
    provider: {
      type: 'authjs',
    },
  },

  colorMode: {
    preference: 'system',
    dataValue: 'theme',
    classSuffix: '',
  },

  compatibilityDate: '2024-11-01',

  css: [
    '~/assets/styles/theme.scss',
    '~/assets/styles/transition.scss',
  ],

  devtools: {
    enabled: true,
    // [Bug]: https://github.com/element-plus/element-plus/issues/18213
    componentInspector: false,
  },

  echarts: {
    renderer: ['canvas', 'svg'],
    charts: ['BarChart', 'MapChart', 'LineChart', 'PieChart'],
    components: [
      'DatasetComponent',
      'GridComponent',
      'TooltipComponent',
      'ToolboxComponent',
      'GeoComponent',
      'VisualMapComponent',
    ],
  },

  elementPlus: {
    importStyle: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  hooks: projectHooksConfig,

  i18n: projectI18nConfig,

  modules: [
    // UI
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    // '@formkit/auto-animate/nuxt',

    // Store
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',

    // I18n
    '@nuxtjs/i18n',

    // Auth
    '@sidebase/nuxt-auth',

    // Lib
    'dayjs-nuxt',
    '@vueuse/nuxt',
    'nuxt-echarts',

    // OpenAPI
    process.env.OPENAPI_DISABLE ? undefined : '@scalar/nuxt',
  ],

  nitro: {
    experimental: {
      openAPI: !process.env.OPENAPI_DISABLE,
    },
    openAPI: {
      ui: {
        scalar: false,
        swagger: false,
      },
    },
  },

  piniaPluginPersistedstate: {
    key: `${PROJECT_NAME}-%id`,
  },

  routeRules: {
    '/admin/**': { ssr: false },
    '/docs/**': { ssr: false },
  },

  runtimeConfig: {
    authOrigin: '',
    authSecret: process.env.NUXT_AUTH_SECRET || '_NO_SECRET_',
    swagger: {
      openapi: '3.1.0',
      title: '膜法集市后台 API 文档',
      version,
      apis: [
        'server/api/**/*.ts',
        'server/schema/**/*.ts',
        'server/services/vo.ts',
      ],
      nitroOpenAPI: `${openapiServerURL}/_openapi.json`,
    },
  },

  scalar: {
    hideDownloadButton: false,
    hideClientButton: true,
    spec: {
      url: process.env.OPENAPI_SPEC_URL || `${openapiServerURL}/api/_openapi`,
    },
    defaultHttpClient: { clientKey: 'ofetch', targetKey: 'js' },
  },

  vite: {
    resolve: {
      alias: { 'echarts/lib/util/number': 'echarts/lib/util/number.js' },
    },
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      },
    },
  },
})
