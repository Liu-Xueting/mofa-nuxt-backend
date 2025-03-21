import { usePreferredDark } from '@vueuse/core'

/**
 * 获取响应式颜色模式
 */
export function useDarkMode() {
  const { isDarkMode, isUseSystemTheme } = storeToRefs(useAppStore())
  /**
   * 是否为系统偏好的暗色模式
   */
  const isPreferredDark = usePreferredDark()
  /**
   * 是否为暗色模式
   */
  const isDark = computed<boolean>(() => {
    return isUseSystemTheme.value ? isPreferredDark.value : isDarkMode.value
  })
  return {
    isDark,
    isPreferredDark,
  }
}
