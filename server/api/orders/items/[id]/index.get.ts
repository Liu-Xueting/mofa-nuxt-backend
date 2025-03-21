/**
 * @openapi
 * /api/orders/items/{id}:
 *   get:
 *     summary: 获取订单项详情
 *     description: 获取订单项的详细信息。
 *     tags:
 *      - 订单
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 订单项 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<OrderItemVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const itemId = getPathId(event)
  const itemVO = await orderItemService.getOrderItemById(itemId)
  return Result.ok(itemVO)
}))
