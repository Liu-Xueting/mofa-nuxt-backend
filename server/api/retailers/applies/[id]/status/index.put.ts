import { RetailerApplyStatusRequestSchema } from '~~/server/schema/modules/retailer-apply'
/**
 * 修改门店申请状态
 * @openapi
 * /api/retailers/applies/{id}/status:
 *  put:
 *   summary: 修改门店申请状态
 *   description: 修改门店申请状态
 *   tags:
 *     - 门店申请
 *   parameters:
 *     - name: id
 *       in: path
 *       description: 门店申请ID
 *       required: true
 *       type: string
 *     - name: status
 *       in: body
 *       description: 门店申请状态
 *       required: true
 *
 */
export default defineEventHandler(wrap(async (event) => {
  const id = getPathId(event)
  const body = await validateBody(event, RetailerApplyStatusRequestSchema)
  const retailerApply = await retailerApplyService.updateStatus(id, body)
  return Result.ok(retailerApply)
}))
