/**
 * @openapi
 * /api/shops/{id}:
 *   get:
 *     summary: 获取店铺详情
 *     description: 获取店铺详情信息。
 *     tags:
 *      - 店铺
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 店铺 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ShopVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const shopId = getPathId(event)
  const shopVO = await shopService.getShopById(shopId)
  return Result.ok(shopVO)
}))
