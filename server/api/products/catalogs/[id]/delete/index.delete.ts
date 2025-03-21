/**
 * @openapi
 * /api/products/catalogs/{id}/delete:
 *   delete:
 *     summary: 删除产品目录
 *     description: 管理员删除产品目录
 *     tags:
 *      - 商品
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 产品目录 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCatalogVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const catalogId = getPathId(event)
  const catalogVO = await productCatalogService.deleteProductCatalog(catalogId)
  return Result.ok(catalogVO)
}))
