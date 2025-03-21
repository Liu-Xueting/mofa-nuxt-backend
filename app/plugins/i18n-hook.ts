/**
 * 国际化钩子，用于切换语言时更新其他库的全局语言
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => {
    updateLocale(newLocale)
  })
})
