import { roleCreateRequestSchema } from '~~/server/schema/modules/role'

/**
 * @openapi
 * /api/roles/create:
 *   post:
 *     summary: 创建角色
 *     description: 返回创建的新角色
 *     tags:
 *      - 角色
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RoleCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<RoleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, roleCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const roleVO = await roleService.createRole(body, loginUserId)
  return Result.ok(roleVO)
}))
