/**
 * @openapi
 * /api/award/tasks/{id}:
 *   get:
 *     summary: 获取发包详情
 *     description: 获取发包详情信息。
 *     tags:
 *      - 发包
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 发包 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AwardTaskVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const taskId = getPathId(event)
  const awardTaskVO = await awardTaskService.getAwardTaskById(taskId)
  return Result.ok(awardTaskVO)
}))
