/**
 * 菜单数据类型
 */
export interface MenuItemType {
  id: string
  /**
   * 路由
   */
  path: string
  meta: {
    /**
     * 菜单名称
     */
    title: string
    /**
     * 菜单图标
     */
    icon?: string
    /**
     * 是否固定
     */
    isPin?: boolean
    /**
     * 是否显示徽标
     */
    showBadge?: boolean
    /**
     * 是否显示文本徽标
     */
    showTextBadge?: string
    /**
     * 是否在菜单中隐藏
     */
    isHide?: boolean
    /**
     * 是否在标签页中隐藏
     */
    isHideTab?: boolean
    /**
     * 链接
     */
    link?: string
    /**
     * 是否是 iframe
     */
    isIframe?: boolean
    /**
     * 是否缓存
     */
    keepAlive?: boolean
  }
  /**
   * 子菜单
   */
  children?: MenuItemType[]
}
