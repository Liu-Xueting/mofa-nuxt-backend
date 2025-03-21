/**
 * @openapi
 * /api/menus/{id}/delete:
 *   post:
 *     summary: 删除菜单
 *     description: 管理员删除菜单项
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
  const menuVO = await menuService.deleteMenu(menuId)
  return Result.ok(menuVO)
}))
