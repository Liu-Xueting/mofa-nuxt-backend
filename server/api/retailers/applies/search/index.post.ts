import { retailerApplySearchRequestSchema } from '~~/server/schema/modules/retailer-apply'
/**
 * @openapi
 * /api/retailers/applies/search:
 *   post:
 *     summary: 搜索门店申请
 *     description: 管理员搜索门店申请列表。
 *     tags:
 *      - 门店申请
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
 *             $ref: '#/definitions/RetailerApplySearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<RetailerApplyVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, retailerApplySearchRequestSchema)
  const page = await getPageQuery(event)
  const retailerApplies = await retailerApplyService.searchRetailerApplies(body, page)
  return Result.ok(retailerApplies)
}))
