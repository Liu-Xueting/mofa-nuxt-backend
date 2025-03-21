import { agentReceiptUpdateRequestSchema } from '~~/server/schema/modules/agent-receipt'

/**
 * @openapi
 * /api/agents/receipts/{id}/update:
 *   post:
 *     summary: 更新代理收款
 *     description: 更新代理收款信息。
 *     tags:
 *      - 代理
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AgentReceiptUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<AgentReceiptVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, agentReceiptUpdateRequestSchema)
  const receiptId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const agentReceiptVO = await agentReceiptService.updateAgentReceipt(receiptId, body, loginUserId)
  return Result.ok(agentReceiptVO)
}))
