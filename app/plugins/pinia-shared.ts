import type { Pinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'

/**
 * 共享
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const pinia = nuxtApp.$pinia as Pinia
    pinia.use(
      PiniaSharedState({
        enable: true,
        initialize: true,
        type: 'localstorage',
      }),
    )
  }
})
