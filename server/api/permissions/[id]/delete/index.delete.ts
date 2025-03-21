/**
 * @openapi
 * /api/permissions/{id}/delete:
 *   post:
 *     summary: 删除权限
 *     description: 管理员删除权限
 *     tags:
 *      - 用户
 *     responses:
 *       200:
 *         description: '`ResultType<PermissionVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const id = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const permissionVO = await permissionService.deletePermission(id, loginUserId)
  return Result.ok(permissionVO)
}))
