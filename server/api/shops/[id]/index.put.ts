import { shopUpdateRequestSchema } from '~~/server/schema/modules/shop'
/**
 * @openapi
 * /api/shops/{id}:
 *   put:
 *     summary: 更新店铺信息
 *     description: 更新店铺信息
 *     tags:
 *      - 店铺
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ShopUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ShopVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权，用户自身或管理员
  const body = await validateBody(event, shopUpdateRequestSchema)
  const userId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const userVO = await shopService.updateShop(userId, body, loginUserId)
  return Result.ok(userVO)
}))
