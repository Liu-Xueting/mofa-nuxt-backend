import { projectI18nConfig } from '~~/config/i18n'
import localeDetector from '~~/config/locale-detector'

/**
 * 国际化中间件，获取语言信息
 */
export default defineEventHandler(async (event) => {
  try {
    if (!event.path.startsWith('/api/')) {
      return
    }
    const lang = localeDetector(event, { defaultLocale: projectI18nConfig.defaultLocale })
    event.context.lang = lang
  } catch (error) {
    console.error('Middleware [i18n]:', error)
  }
})
