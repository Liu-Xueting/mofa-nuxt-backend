/**
 * @openapi
 * /api/transactions/{id}/delete:
 *   post:
 *     summary: 删除交易记录
 *     description: 管理员删除交易记录
 *     tags:
 *      - 交易
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 交易记录 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<TransactionVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const transactionId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const transactionVO = await transactionService.deleteTransaction(transactionId, loginUserId)
  return Result.ok(transactionVO)
}))
