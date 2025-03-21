/**
 * @openapi
 * /api/orders/items/{id}/delete:
 *   post:
 *     summary: 删除订单项目
 *     description: 管理员删除订单项目
 *     tags:
 *      - 订单
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 订单项目 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<OrderItemVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const itemId = getPathId(event)
  const orderItemVO = await orderItemService.deleteOrderItem(itemId)
  return Result.ok(orderItemVO)
}))
