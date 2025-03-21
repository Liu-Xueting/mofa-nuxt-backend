/**
 * @openapi
 * /api/products/{id}/delete:
 *   post:
 *     summary: 删除商品
 *     description: 管理员删除商品
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
  const productVO = await productService.deleteProduct(productId)
  return Result.ok(productVO)
}))
