/**
 * @openapi
 * /api/orders/{id}/delete:
 *   post:
 *     summary: 删除订单
 *     description: 管理员删除订单
 *     tags:
 *      - 订单
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 订单 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<OrderVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const orderId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const orderVO = await orderService.deleteOrder(orderId, loginUserId)
  return Result.ok(orderVO)
}))
