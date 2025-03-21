import { menuUpdateRequestSchema } from '~~/server/schema/modules/menu'

/**
 * @openapi
 * /api/menus/{id}/update:
 *   put:
 *     summary: 更新菜单
 *     description: 更新现有菜单项的详细信息。
 *     tags:
 *       - Menu
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/MenuUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<MenuVO>`'
 */

export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权，用户自身或管理员
  const body = await validateBody(event, menuUpdateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const id = getPathId(event)
  const menuVo = await menuService.updateMenu(id, body, loginUserId)
  return Result.ok(menuVo)
}))
