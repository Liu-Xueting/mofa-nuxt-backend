import { productUpdateRequestSchema } from '~~/server/schema/modules/product'
/**
 * @openapi
 * /api/products/{id}/update:
 *   put:
 *     summary: 更新商品
 *     description: 返回更新的新商品
 *     tags:
 *      - 商品
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productUpdateRequestSchema)
  const productId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const productVO = await productService.updateProduct(productId, body, loginUserId)
  return Result.ok(productVO)
}))
