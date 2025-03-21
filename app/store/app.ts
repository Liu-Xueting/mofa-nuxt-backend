/**
 * App 全局数据
 */
export const useAppStore = defineStore('app', () => {
  const isUseSystemTheme = ref(true)
  const isDarkMode = ref(false)
  const colorMode = useColorMode()

  /**
   * 刷新标识
   */
  const refresh = ref(false)
  /**
   * 是否正在刷新
   */
  const isRefreshing = ref(false)

  /**
   * 触发刷新
   */
  function toggleRefresh() {
    refresh.value = !refresh.value
  }
  /**
   * 监听刷新
   */
  watch(() => refresh.value, () => {
    if (!isRefreshing.value) {
      isRefreshing.value = true
      setTimeout(() => {
        isRefreshing.value = false
      }, 300)
    }
  })

  /**
   * 切换主题
   */
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
  }

  watch(() => isUseSystemTheme.value, (value) => {
    if (value) {
      colorMode.preference = 'system'
    } else {
      colorMode.preference = colorMode.value
      isDarkMode.value = colorMode.value === 'dark'
    }
  })
  watch(() => isDarkMode.value, (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  })

  return {
    isUseSystemTheme,
    isDarkMode,
    refresh,
    isRefreshing,
    toggleRefresh,
    toggleTheme,
  }
}, {
  persist: {
    pick: [
      'isUseSystemTheme',
      'isDarkMode',
    ],
  },
})
