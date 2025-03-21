/**
 * @openapi
 * /api/resources/catalogs/{id}:
 *   get:
 *     summary: 获取资源目录详情
 *     description: 获取资源目录的详细信息。
 *     tags:
 *      - 资源
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 资源目录 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ResourceCatalogVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const catalogId = getPathId(event)
  const catalogVO = await resourceCatalogService.getResourceCatalogById(catalogId)
  return Result.ok(catalogVO)
}))
