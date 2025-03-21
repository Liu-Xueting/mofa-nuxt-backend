/**
 * @openapi
 * /api/menus/{id}:
 *   get:
 *     summary: 获取菜单详情
 *     description: 获取菜单详情信息。
 *     tags:
 *      - 菜单
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 菜单 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<MenuVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const menuId = getPathId(event)
  const menuVO = await menuService.getMenuById(menuId)
  return Result.ok(menuVO)
}))
