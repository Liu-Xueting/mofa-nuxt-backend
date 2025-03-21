import { productStatusRequestSchema } from '~~/server/schema/modules/product'
/**
 * 修改商品状态
 * @openapi
 * /api/products/{id}/status:
 *  put:
 *   summary: 修改商品状态
 *   description: 修改商品状态
 *   tags:
 *     - 商品
 *   parameters:
 *     - name: id
 *       in: path
 *       description: 商品ID
 *       required: true
 *       type: string
 *     - name: status
 *       in: body
 *       description: 商品状态
 *       required: true
 *
 */
export default defineEventHandler(wrap(async (event) => {
  const id = getPathId(event)
  const body = await validateBody(event, productStatusRequestSchema)
  const ProductVO = await productService.updateStatus(id, body)
  return Result.ok(ProductVO)
}))
