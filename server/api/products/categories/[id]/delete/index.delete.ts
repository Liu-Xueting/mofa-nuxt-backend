/**
 * @openapi
 * /api/products/categories/{id}/delete:
 *   delete:
 *     summary: 删除产品分类
 *     description: 管理员删除产品分类
 *     tags:
 *      - 商品
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 产品分类 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCategoryVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const categoryId = getPathId(event)
  const categoryVO = await productCategoryService.deleteProductCategory(categoryId)
  return Result.ok(categoryVO)
}))
