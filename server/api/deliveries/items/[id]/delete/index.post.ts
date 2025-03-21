/**
 * @openapi
 * /api/deliveries/items/{id}/delete:
 *   post:
 *     summary: 删除配送项目
 *     description: 管理员删除配送项目
 *     tags:
 *      - 物流
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 配送项目 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<DeliveryItemVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const itemId = getPathId(event)
  const deliveryItemVO = await deliveryItemService.deleteDeliveryItem(itemId)
  return Result.ok(deliveryItemVO)
}))
