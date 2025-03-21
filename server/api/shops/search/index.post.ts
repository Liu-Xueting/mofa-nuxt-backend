import { shopSearchRequestSchema } from '~~/server/schema/modules/shop'

/**
 * @openapi
 * /api/shops/search:
 *   post:
 *     summary: 搜索店铺
 *     description: 管理员搜索店铺列表。
 *     tags:
 *      - 店铺
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
 *             $ref: '#/definitions/ShopSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<ShopVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, shopSearchRequestSchema)
  const page = await getPageQuery(event)
  const shops = await shopService.searchShops(body, page)
  return Result.ok(shops)
}))
