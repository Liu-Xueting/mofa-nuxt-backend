import { agentReceiptCreateRequestSchema } from '~~/server/schema/modules/agent-receipt'

/**
 * @openapi
 * /api/agents/receipts/create:
 *   post:
 *     summary: 创建代理收款
 *     description: 返回创建的新代理收款
 *     tags:
 *      - 代理
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AgentReceiptCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<AgentReceiptVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, agentReceiptCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const agentReceiptVO = await agentReceiptService.createAgentReceipt(body, loginUserId)
  return Result.ok(agentReceiptVO)
}))
