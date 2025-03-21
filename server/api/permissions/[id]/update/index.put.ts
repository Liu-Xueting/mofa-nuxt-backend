import { permissionUpdateRequestSchema } from '~~/server/schema/modules/permission'

/**
 * @openapi
 * /api/permissions/{id}/update:
 *   post:
 *     summary: 更新权限信息
 *     description: 更新权限信息
 *     tags:
 *      - 权限
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/PermissionUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PermissionVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权，用户自身或管理员
  const body = await validateBody(event, permissionUpdateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const id = getPathId(event)
  const permissionVO = await permissionService.updatePermission(id, body, loginUserId)
  return Result.ok(permissionVO)
}))
