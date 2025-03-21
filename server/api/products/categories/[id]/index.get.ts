/**
 * @openapi
 * /api/products/categories/{id}:
 *   get:
 *     summary: 获取商品分类详情
 *     description: 获取商品分类详情信息。
 *     tags:
 *      - 商品
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 商品分类 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCategoryVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const categoryId = getPathId(event)
  const productCategoryVO = await productCategoryService.getProductCategoryById(categoryId)
  return Result.ok(productCategoryVO)
}))
