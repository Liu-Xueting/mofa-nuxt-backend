import { shopApplySearchRequestSchema } from '~~/server/schema/modules/shop-apply'

/**
 * @openapi
 * /api/shops/apply/search:
 *   post:
 *     summary: 搜索店铺申请
 *     description: 管理员搜索店铺申请列表。
 *     tags:
 *      - 店铺申请
 *     parameters:
 *      - name: page
 *        in: query
 *        description: 页码
 *        required: false
 *        type: integer
 *        default: 1
 *      - name: size
 *        in: query
 *        description: 每页数量
 *        required: false
 *        type: integer
 *        default: 10
 *     requestBody:
 *       description: 搜索条件
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ShopApplySearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<ShopApplyVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, shopApplySearchRequestSchema)
  const page = await getPageQuery(event)
  const shopApplies = await shopApplyService.searchShopApplies(body, page)
  return Result.ok(shopApplies)
}))
