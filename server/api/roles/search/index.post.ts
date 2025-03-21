import { roleSearchRequestSchema } from '~~/server/schema/modules/role'
/**
 * @openapi
 * /api/roles/search:
 *   post:
 *     summary: 搜索角色
 *     description: 管理员搜索角色列表。
 *     tags:
 *      - 角色
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
 *             $ref: '#/definitions/RoleSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<RoleVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, roleSearchRequestSchema)
  const page = await getPageQuery(event)
  const roles = await roleService.searchRole(body, page)
  return Result.ok(roles)
}))
