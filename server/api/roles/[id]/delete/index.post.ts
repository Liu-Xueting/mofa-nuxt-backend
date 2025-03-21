/**
 * @openapi
 * /api/roles/{id}/delete:
 *   post:
 *     summary: 删除角色
 *     description: 管理员删除角色
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
  const loginUserId = getLoginUserId(event)
  const roleVO = await roleService.deleteRole(roleId, loginUserId)
  return Result.ok(roleVO)
}))
