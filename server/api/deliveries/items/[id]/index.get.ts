/**
 * @openapi
 * /api/deliveries/items/{id}:
 *   get:
 *     summary: 获取配送项详情
 *     description: 获取配送项详情信息。
 *     tags:
 *      - 物流
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 配送项 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<DeliveryItemVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const itemId = getPathId(event)
  const deliveryItemVO = await deliveryItemService.getDeliveryItemById(itemId)
  return Result.ok(deliveryItemVO)
}))
