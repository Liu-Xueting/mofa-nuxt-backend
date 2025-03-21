import { agentApplyCreateRequestSchema } from '~~/server/schema/modules/agent-apply'

/**
 * @openapi
 * /api/agents/applies/create:
 *   post:
 *     summary: 创建代理申请
 *     description: 返回创建的新代理申请
 *     tags:
 *      - 代理
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AgentApplyCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<AgentApplyVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, agentApplyCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const agentApplyVO = await agentApplyService.createAgentApply(body, loginUserId)
  return Result.ok(agentApplyVO)
}))
