/**
 * @openapi
 * /api/shops/apply/{id}/delete:
 *   post:
 *     summary: 删除店铺申请
 *     description: 管理员删除店铺申请
 *     tags:
 *      - 店铺申请
 *     responses:
 *       200:
 *         description: '`ResultType<ShopApplyVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const id = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const shopApply = await shopApplyService.deleteShopApply(id, loginUserId)
  return Result.ok(shopApply)
}))
