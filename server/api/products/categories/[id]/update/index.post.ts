import { productCategoryUpdateRequestSchema } from '~~/server/schema/modules/product-category'

/**
 * @openapi
 * /api/products/categories/{id}/update:
 *   post:
 *     summary: 更新产品类别
 *     description: 更新产品类别信息。
 *     tags:
 *      - 商品
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductCategoryUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCategoryVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productCategoryUpdateRequestSchema)
  const categoryId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const productCategoryVO = await productCategoryService.updateProductCategory(categoryId, body, loginUserId)
  return Result.ok(productCategoryVO)
}))
