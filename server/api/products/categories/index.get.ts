/**
 * 获取商品分类列表
 * @openapi
 * /api/products/categories:
 *   get:
 *     summary: 获取商品分类列表
 *     description: 获取商品分类列表。
 *     tags:
 *      - 商品分类
 *     responses:
 *       200:
 *         description: '`ResultType<List<ProductCategoryVO>>`'
 */
export default defineEventHandler(wrap(async () => {
  const categories = await productCategoryService.getProductCategories()
  return Result.ok(categories)
}))
