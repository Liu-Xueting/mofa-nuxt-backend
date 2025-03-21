/**
 * @openapi
 * /api/agents/applies/{id}/delete:
 *   post:
 *     summary: 删除代理申请
 *     description: 管理员删除代理申请
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
  const applyVO = await agentApplyService.deleteAgentApply(applyId)
  return Result.ok(applyVO)
}))
