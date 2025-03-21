/**
 * @openapi
 * /api/orders/after-sales/{id}:
 *   get:
 *     summary: 获取售后服务详情
 *     description: 获取售后服务的详细信息。
 *     tags:
 *      - 售后
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 售后服务 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AfterSaleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const afterSaleId = getPathId(event)
  const afterSaleVO = await afterSaleService.getAfterSaleById(afterSaleId)
  return Result.ok(afterSaleVO)
}))
