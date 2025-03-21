/**
 * 实验性功能！国际化语言检测器，用于探测后端请求的语言。
 * 该检测器将会在每次请求时被调用，返回的语言将会被用于后续的国际化处理。
 */
export type LocaleDetector = Parameters<typeof defineI18nLocaleDetector>[0]

export const localeDetector: LocaleDetector = (event, config) => {
  // 从缓存的上下文中获取语言
  if (event.context.lang && typeof event.context.lang === 'string') {
    return event.context.lang
  }

  // 从 Query 参数中获取语言
  const query = tryQueryLocale(event, { lang: '' })
  if (query) {
    return query.toString()
  }

  // 从 Cookie 中获取语言
  const cookie = tryCookieLocale(event, { lang: '', name: 'i18n_redirected' })
  if (cookie) {
    return cookie.toString()
  }

  // 从 Header 中获取语言
  const header = tryHeaderLocale(event, { lang: '' })
  if (header) {
    return header.toString()
  }

  // 返回默认语言
  return config.defaultLocale
}

export default defineI18nLocaleDetector(localeDetector)
