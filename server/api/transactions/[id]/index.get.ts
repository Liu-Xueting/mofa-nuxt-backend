/**
 * @openapi
 * /api/transactions/{id}:
 *   get:
 *     summary: 获取交易详情
 *     description: 获取交易的详细信息。
 *     tags:
 *      - 交易
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 交易 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<TransactionVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const transactionId = getPathId(event)
  const transactionVO = await transactionService.getTransactionById(transactionId)
  return Result.ok(transactionVO)
}))
