import { menuSearchRequestSchema } from '~~/server/schema/modules/menu'
/**
 * @openapi
 * /api/menus/search:
 *   post:
 *     summary: 搜索菜单
 *     description: 管理员搜索菜单列表。
 *     tags:
 *      - 菜单
 *     parameters:
 *      - name: page
 *        in: query
 *        description: 页码
 *        required: false
 *        type: integer
 *        default: 1
 *      - name: size
 *        in: query
 *        description: 每页数量
 *        required: false
 *        type: integer
 *        default: 10
 *     requestBody:
 *       description: 搜索条件
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/PermissionSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<MenuVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, menuSearchRequestSchema)
  const page = await getPageQuery(event)
  const permissions = await menuService.searchMenu(body, page)
  return Result.ok(permissions)
}))
