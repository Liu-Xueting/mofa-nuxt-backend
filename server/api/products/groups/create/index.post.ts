import { productGroupCreateRequestSchema } from '~~/server/schema/modules/product-group'

/**
 * @openapi
 * /api/products/groups/create:
 *   post:
 *     summary: 创建产品分组
 *     description: 返回创建的新产品分组
 *     tags:
 *      - 商品
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductGroupCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductGroupVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productGroupCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const productGroupVO = await productGroupService.createProductGroup(body, loginUserId)
  return Result.ok(productGroupVO)
}))
