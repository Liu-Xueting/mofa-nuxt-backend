/**
 * 图标
 * @param name 名称
 * @param size 尺寸
 * @param color 颜色
 * @returns 渲染函数
 */
export function I(name: string, size?: number, color?: string) {
  return () => h('Icon', {
    name,
    size,
    color,
  })
}
