import { productTagUpdateRequestSchema } from '~~/server/schema/modules/product-tag'
/**
 * @openapi
 * /api/products/tags/{id}/update:
 *   post:
 *     summary: 更新商品标签
 *     description: 更新商品标签信息。
 *     tags:
 *      - 商品标签
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductTagUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductTagVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productTagUpdateRequestSchema)
  const tagId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const productTagVO = await productTagService.updateProductTag(tagId, body, loginUserId)
  return Result.ok(productTagVO)
}))
