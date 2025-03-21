import { shopApplyCreateRequestSchema } from '~~/server/schema/modules/shop-apply'
/**
 * @openapi
 * /api/shops/apply/create:
 *   post:
 *     summary: 创建店铺申请
 *     description: 创建店铺申请。
 *     tags:
 *      - 店铺申请
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ShopApplyCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ShopApplyVO>`'
 */

export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权，用户自身或管理员
  const body = await validateBody(event, shopApplyCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const shopApplyVO = await shopApplyService.createShopApply(loginUserId, body, loginUserId)
  return Result.ok(shopApplyVO)
}))
