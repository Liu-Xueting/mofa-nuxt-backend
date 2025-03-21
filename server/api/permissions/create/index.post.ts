import { permissionCreateRequestSchema } from '~~/server/schema/modules/permission'

/**
 * @openapi
 * /api/permissions/create:
 *   post:
 *     summary: 创建权限
 *     description: 创建权限。
 *     tags:
 *      - 权限
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/PermissionCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PermissionVO>`'
 */

export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权，用户自身或管理员
  const body = await validateBody(event, permissionCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const permissionVO = await permissionService.createPermission(body, loginUserId)
  return Result.ok(permissionVO)
}))
