/**
 * 获取店铺列表
 * @openapi
 * /api/shops:
 *   get:
 *     summary: 获取店铺列表
 *     description: 获取店铺列表。
 *     tags:
 *      - 店铺
 *     responses:
 *       200:
 *         description: '`ResultType<List<ShopVO>>`'
 */
export default defineEventHandler(wrap(async () => {
  const shops = await shopService.getShops()
  return Result.ok(shops)
}))
