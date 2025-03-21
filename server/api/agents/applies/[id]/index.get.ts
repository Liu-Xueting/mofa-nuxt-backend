/**
 * @openapi
 * /api/agents/applies/{id}:
 *   get:
 *     summary: 获取代理申请详情
 *     description: 获取代理申请详情信息。
 *     tags:
 *      - 代理
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 代理申请 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AgentApplyVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const applyId = getPathId(event)
  const agentApplyVO = await agentApplyService.getAgentApplyById(applyId)
  return Result.ok(agentApplyVO)
}))
