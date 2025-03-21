/**
 * @openapi
 * /api/notifications/{id}:
 *   get:
 *     summary: 获取通知详情
 *     description: 获取特定通知的详细信息。
 *     tags:
 *      - 通知
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 通知 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<NotificationVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const notificationId = getPathId(event)
  const notificationVO = await notificationService.getNotificationById(notificationId)
  return Result.ok(notificationVO)
}))
