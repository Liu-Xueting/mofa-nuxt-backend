/**
 * @openapi
 * /api/products/catalogs/{id}:
 *   get:
 *     summary: 获取商品目录详情
 *     description: 获取商品目录详情信息。
 *     tags:
 *      - 商品
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 商品目录 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCatalogVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const catalogId = getPathId(event)
  const productCatalogVO = await productCatalogService.getProductCatalogById(catalogId)
  return Result.ok(productCatalogVO)
}))
