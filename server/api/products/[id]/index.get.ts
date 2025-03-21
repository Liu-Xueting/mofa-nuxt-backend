/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: 获取商品详情
 *     description: 获取商品详情信息。
 *     tags:
 *      - 商品
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 商品 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const productId = getPathId(event)
  const productVO = await productService.getProductById(productId)
  return Result.ok(productVO)
}))
