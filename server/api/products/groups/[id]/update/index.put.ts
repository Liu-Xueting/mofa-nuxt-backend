import { productGroupUpdateRequestSchema } from '~~/server/schema/modules/product-group'

/**
 * @openapi
 * /api/products/groups/{id}/update:
 *   put:
 *     summary: 更新产品组
 *     description: 更新产品组信息。
 *     tags:
 *      - 商品
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductGroupUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductGroupVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productGroupUpdateRequestSchema)
  const groupId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const productGroupVO = await productGroupService.updateProductGroup(groupId, body, loginUserId)
  return Result.ok(productGroupVO)
}))
