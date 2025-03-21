/**
 * @openapi
 * /api/award/tasks/{id}/delete:
 *   post:
 *     summary: 删除发包任务
 *     description: 管理员删除发包任务
 *     tags:
 *      - 发包
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 发包任务 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AwardTaskVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const taskId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const awardTaskVO = await awardTaskService.deleteAwardTask(taskId, loginUserId)
  return Result.ok(awardTaskVO)
}))
