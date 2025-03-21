/**
 * @openapi
 * /api/roles/{id}:
 *   get:
 *     summary: 获取角色信息
 *     description: 获取角色的详细信息
 *     tags:
 *      - 角色
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 角色 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<RoleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const roleId = getPathId(event)
  const role = await roleService.getRole(roleId)
  return Result.ok(role)
}))
