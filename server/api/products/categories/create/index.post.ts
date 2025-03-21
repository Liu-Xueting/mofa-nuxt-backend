import { productCategoryCreateRequestSchema } from '~~/server/schema/modules/product-category'

/**
 * @openapi
 * /api/products/categories/create:
 *   post:
 *     summary: 创建产品分类
 *     description: 返回创建的新产品分类
 *     tags:
 *      - 商品
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductCategoryCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCategoryVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productCategoryCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const productCategoryVO = await productCategoryService.createProductCategory(body, loginUserId)
  return Result.ok(productCategoryVO)
}))
