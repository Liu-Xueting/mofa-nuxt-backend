/**
 * 标签页
 */
export const useTabStore = defineStore('tab', () => {
  /**
   * 标签页数据
   */
  const tabs = ref<MenuItemType[]>([])
  const route = useRoute()
  const localePath = useLocalePath()

  const sortedTabs = computed(
    () => tabs.value.filter(
      tab => tab.meta.isPin,
    ).concat(
      tabs.value.filter(tab => !tab.meta.isPin),
    ),
  )

  /**
   * 添加标签页
   * @param data 菜单数据
   */
  function appendTab(data: MenuItemType) {
    if (tabs.value.some(item => item.id === data.id)) {
      return
    }
    tabs.value.push(data)
  }

  /**
   * 移除标签页
   * @param menuId 菜单 ID
   */
  function removeTab(menuId: string) {
    const tab = tabs.value.find(item => item.id === menuId)
    if (!tab) {
      return
    }
    tabs.value = tabs.value.filter(item => item.id !== menuId)
    if (tab.path === route.path) {
      const lastTab = sortedTabs.value[sortedTabs.value.length - 1]
      if (lastTab) {
        navigateTo(localePath(lastTab.path))
      }
    }
  }

  /**
   * 移除所有标签页
   */
  function removeAllTabs() {
    tabs.value = tabs.value.filter(item => item.meta.isPin)
  }

  /**
   * 关闭其他
   * @param path 路径
   */
  function removeOthers(path: string) {
    tabs.value = tabs.value.filter(
      item => item.path === path || item.meta.isPin,
    )
  }

  /**
   * 获取标签页
   */
  function getTabs() {
    return tabs.value
  }

  return {
    tabs,
    sortedTabs,
    appendTab,
    removeTab,
    removeAllTabs,
    removeOthers,
    getTabs,
  }
})
