import { ShopApplyStatusSchema } from '~~/server/schema/modules/shop-apply'
/**
 * 修改店铺申请状态
 * @openapi
 * /api/shops/apply/{id}/status:
 *  put:
 *   summary: 修改店铺申请状态
 *   description: 修改店铺申请状态
 *   tags:
 *     - 店铺申请
 *   parameters:
 *     - name: id
 *       in: path
 *       description: 店铺申请ID
 *       required: true
 *       type: string
 *     - name: status
 *       in: body
 *       description: 店铺申请状态
 *       required: true
 *
 */
export default defineEventHandler(wrap(async (event) => {
  const id = getPathId(event)
  const body = await validateBody(event, ShopApplyStatusSchema)
  const shopApply = await shopApplyService.updateShopApplyStatus(id, body)
  return Result.ok(shopApply)
}))
