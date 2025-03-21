/**
 * @openapi
 * /api/agents/{id}:
 *   get:
 *     summary: 通过 ID 获取代理
 *     description: 通过 ID 获取代理
 *     tags:
 *      - 代理
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 代理 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AgentVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const agentId = getPathId(event)
  const agentVO = await agentService.getAgentById(agentId)
  return Result.ok(agentVO)
}))
