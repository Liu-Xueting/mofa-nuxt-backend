import enUS from 'element-plus/es/locale/lang/en'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

export const eleLocale: Record<GlobalLocale, typeof zhCN> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}
export const dayjsLocale: Record<GlobalLocale, string> = {
  'zh-CN': 'zh-cn',
  'en-US': 'en',
}

/**
 * 更新全局语言
 * @param locale 语言
 */
export function updateLocale(locale: GlobalLocale) {
  // Dayjs
  const dayjs = useDayjs()
  dayjs.locale(dayjsLocale[locale])
}
