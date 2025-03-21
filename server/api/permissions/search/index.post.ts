import { permissionSearchRequestSchema } from '~~/server/schema/modules/permission'
/**
 * @openapi
 * /api/permissions/search:
 *   post:
 *     summary: 搜索权限
 *     description: 管理员搜索权限列表。
 *     tags:
 *      - 权限
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
 *         description: '`ResultType<PageType<PermissionVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, permissionSearchRequestSchema)
  const page = await getPageQuery(event)
  const permissions = await permissionService.searchPermission(body, page)
  return Result.ok(permissions)
}))
