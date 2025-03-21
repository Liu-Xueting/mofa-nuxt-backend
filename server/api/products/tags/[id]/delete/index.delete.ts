/**
 * @openapi
 * /api/products/tags/{id}/delete:
 *   delete:
 *     summary: 删除商品标签
 *     description: 管理员删除商品标签
 *     tags:
 *      - 商品标签
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 商品标签 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductTagVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const tagId = getPathId(event)
  const tagVO = await productTagService.deleteProductTag(tagId)
  return Result.ok(tagVO)
}))
