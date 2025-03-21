/**
 * @openapi
 * /api/products/groups/{id}/delete:
 *   post:
 *     summary: 删除产品组
 *     description: 管理员删除产品组
 *     tags:
 *      - 商品
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 产品组 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductGroupVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const groupId = getPathId(event)
  const groupVO = await productGroupService.deleteProductGroup(groupId)
  return Result.ok(groupVO)
}))
