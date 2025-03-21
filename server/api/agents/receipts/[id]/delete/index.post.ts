/**
 * @openapi
 * /api/agents/receipts/{id}/delete:
 *   post:
 *     summary: 删除代理收款
 *     description: 管理员删除代理收款
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
  const receiptVO = await agentReceiptService.deleteAgentReceipt(receiptId)
  return Result.ok(receiptVO)
}))
