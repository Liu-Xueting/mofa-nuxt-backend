/**
 * @openapi
 * /api/products/groups/{id}:
 *   get:
 *     summary: 获取商品组详情
 *     description: 获取商品组详情信息。
 *     tags:
 *      - 商品
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 商品组 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductGroupVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const groupId = getPathId(event)
  const productGroupVO = await productGroupService.getProductGroupById(groupId)
  return Result.ok(productGroupVO)
}))
