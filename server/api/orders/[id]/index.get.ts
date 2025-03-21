/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: 获取订单详情
 *     description: 获取订单详细信息。
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
  const orderVO = await orderService.getOrderById(orderId)
  return Result.ok(orderVO)
}))
