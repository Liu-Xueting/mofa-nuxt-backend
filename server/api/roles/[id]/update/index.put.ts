import { roleUpdateRequestSchema } from '~~/server/schema/modules/role'

/**
 * @openapi
 * /api/roles/{id}/update:
 *   post:
 *     summary: 更新角色
 *     description: 管理员更新角色信息。
 *     tags:
 *      - 角色
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RoleUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<RoleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, roleUpdateRequestSchema)
  const roleId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const roleVO = await roleService.updateRole(roleId, body, loginUserId)
  return Result.ok(roleVO)
}))
