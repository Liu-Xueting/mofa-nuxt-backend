import * as Vue from 'vue'

/**
 * 全局暴露 Vue，以便后期可单独开发插件，无需依赖 Vue
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hook('app:created', () => {
      Object.defineProperty(globalThis.window ?? {}, 'Vue', {
        value: Vue,
        writable: false,
      })
    })
  }
})
