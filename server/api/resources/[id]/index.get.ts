/**
 * @openapi
 * /api/resources/{id}:
 *   get:
 *     summary: 获取资源详情
 *     description: 获取资源的详细信息。
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
  const resourceVO = await resourceService.getResourceById(resourceId)
  return Result.ok(resourceVO)
}))
