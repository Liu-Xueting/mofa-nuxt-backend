/**
 * 获取商品分组列表
 * @openapi
 * /api/products/groups:
 *   get:
 *     summary: 获取商品分组列表
 *     description: 获取商品分组列表。
 *     tags:
 *      - 商品分组
 *     responses:
 *       200:
 *         description: '`ResultType<List<ProductGroupVO>>`'
 */
export default defineEventHandler(wrap(async () => {
  const groups = await productGroupService.getProductGroups()
  return Result.ok(groups)
}))
