/**
 * @openapi
 * /api/deliveries/{id}/delete:
 *   post:
 *     summary: 删除配送订单
 *     description: 管理员删除配送订单
 *     tags:
 *      - 物流
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 配送订单 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<DeliveryVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const deliveryId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const deliveryVO = await deliveryService.deleteDelivery(deliveryId, loginUserId)
  return Result.ok(deliveryVO)
}))
