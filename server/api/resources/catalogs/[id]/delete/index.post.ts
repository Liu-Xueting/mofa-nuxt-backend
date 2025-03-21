/**
 * @openapi
 * /api/resources/catalogs/{id}/delete:
 *   post:
 *     summary: 删除资源目录
 *     description: 管理员删除资源目录
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
  const loginUserId = getLoginUserId(event)
  const resourceCatalogVO = await resourceCatalogService.deleteResourceCatalog(catalogId, loginUserId)
  return Result.ok(resourceCatalogVO)
}))
