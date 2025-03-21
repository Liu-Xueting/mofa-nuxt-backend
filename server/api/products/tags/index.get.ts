/**
 * 获取商品标签列表
 * @openapi
 * /api/products/tags:
 *   get:
 *     summary: 获取商品标签列表
 *     description: 获取商品标签列表。
 *     tags:
 *      - 商品标签
 *     responses:
 *       200:
 *         description: '`ResultType<List<ProductTagVO>>`'
 */
export default defineEventHandler(wrap(async () => {
  const tags = await productTagService.getProductTags()
  return Result.ok(tags)
}))
