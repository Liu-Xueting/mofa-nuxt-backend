/**
 * @openapi
 * /api/agents/receipts/{id}:
 *   get:
 *     summary: 获取代理收款详情
 *     description: 获取代理收款详情信息。
 *     tags:
 *      - 代理
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 代理收款 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AgentReceiptVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const receiptId = getPathId(event)
  const agentReceiptVO = await agentReceiptService.getAgentReceiptById(receiptId)
  return Result.ok(agentReceiptVO)
}))
