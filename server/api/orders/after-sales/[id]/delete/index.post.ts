/**
 * @openapi
 * /api/orders/after-sales/{id}/delete:
 *   post:
 *     summary: 删除售后
 *     description: 管理员删除售后记录
 *     tags:
 *      - 售后
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 售后 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AfterSaleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const afterSaleId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const afterSaleVO = await afterSaleService.deleteAfterSale(afterSaleId, loginUserId)
  return Result.ok(afterSaleVO)
}))
