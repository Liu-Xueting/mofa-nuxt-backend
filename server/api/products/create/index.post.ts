import { productCreateRequestSchema } from '~~/server/schema/modules/product'
/**
 * @openapi
 * /api/products/create:
 *   post:
 *     summary: 创建商品
 *     description: 返回创建的新商品
 *     tags:
 *      - 商品
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const productVO = await productService.createProduct(body, loginUserId)
  return Result.ok(productVO)
}))
