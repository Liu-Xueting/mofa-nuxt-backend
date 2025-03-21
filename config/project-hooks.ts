import type { NuxtConfig } from 'nuxt/schema'
import { consola } from 'consola'
import { helloText } from './constant'

export const projectHooksConfig = {
  'pages:extend': () => {
  },
  'ready': () => {
    consola.success(helloText)
  },
} satisfies NuxtConfig['hooks']
