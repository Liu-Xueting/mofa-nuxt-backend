/**
 * 菜单数据
 */
export const useMenuStore = defineStore('menu', () => {
  /**
   * 菜单数据
   */
  const menu = ref<MenuVO[]>([])
  /**
   * 是否折叠
   */
  const isCollapse = ref(false)

  function setMenu(data: MenuVO[]) {
    menu.value = data
  }

  function getMenu() {
    return menu.value
  }

  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    setMenu,
    getMenu,
    toggleCollapse,
  }
})
