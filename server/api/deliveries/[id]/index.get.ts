/**
 * @openapi
 * /api/deliveries/{id}:
 *   get:
 *     summary: 获取配送详情
 *     description: 获取配送详情信息。
 *     tags:
 *      - 物流
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 配送 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<DeliveryVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const deliveryId = getPathId(event)
  const deliveryVO = await deliveryService.getDeliveryById(deliveryId)
  return Result.ok(deliveryVO)
}))
