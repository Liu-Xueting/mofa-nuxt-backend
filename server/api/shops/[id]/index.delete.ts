/**
 * @openapi
 * /api/shops/{id}:
 *   post:
 *     summary: 删除店铺
 *     description: 管理员删除店铺
 *     tags:
 *      - 店铺
 *     responses:
 *       200:
 *         description: '`ResultType<ShopVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const id = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const shopVO = await shopService.deleteShop(id, loginUserId)
  return Result.ok(shopVO)
}))
