import { menuCreateRequestSchema } from '~~/server/schema/modules/menu'

/**
 * @openapi
 * /api/menus/create:
 *   post:
 *     summary: 创建菜单
 *     description: 创建菜单。
 *     tags:
 *      - 权限
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/MenuCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<MenuVO>`'
 */

export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权，用户自身或管理员
  const body = await validateBody(event, menuCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const menuVO = await menuService.createMenu(body, loginUserId)
  return Result.ok(menuVO)
}))
