import { productTagCreateRequestSchema } from '~~/server/schema/modules/product-tag'
/**
 * @openapi
 * /api/products/tags/create:
 *   post:
 *     summary: 创建商品标签
 *     description: 返回创建的新商品标签
 *     tags:
 *      - 商品标签
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductTagCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductTagVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productTagCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const productTagVO = await productTagService.createProductTag(body, loginUserId)
  return Result.ok(productTagVO)
}))
