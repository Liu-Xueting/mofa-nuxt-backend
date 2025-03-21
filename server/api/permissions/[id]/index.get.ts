/**
 * @openapi
 * /api/permissions/{id}:
 *   get:
 *     summary: 权限详情
 *     description: 获取权限详情。
 *     tags:
 *      - 权限
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 权限 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<PermissionVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const permissionId = getPathId(event)
  const permissionVO = await permissionService.getPermissionById(permissionId)
  return Result.ok(permissionVO)
}))
