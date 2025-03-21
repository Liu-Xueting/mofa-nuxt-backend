/**
 * @openapi
 * /api/resources/{id}/delete:
 *   post:
 *     summary: 删除资源
 *     description: 管理员删除资源
 *     tags:
 *      - 资源
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 资源 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ResourceVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const resourceId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const resourceVO = await resourceService.deleteResource(resourceId, loginUserId)
  return Result.ok(resourceVO)
}))
