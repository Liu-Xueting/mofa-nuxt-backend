import { agentApplyUpdateRequestSchema } from '~~/server/schema/modules/agent-apply'

/**
 * @openapi
 * /api/agents/applies/{id}/update:
 *   post:
 *     summary: 更新代理申请
 *     description: 更新代理申请信息。
 *     tags:
 *      - 代理
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AgentApplyUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<AgentApplyVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, agentApplyUpdateRequestSchema)
  const applyId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const agentApplyVO = await agentApplyService.updateAgentApply(applyId, body, loginUserId)
  return Result.ok(agentApplyVO)
}))
