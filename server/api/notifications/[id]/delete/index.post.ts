/**
 * @openapi
 * /api/notifications/{id}/delete:
 *   post:
 *     summary: 删除通知
 *     description: 管理员删除通知
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
  const notificationVO = await notificationService.deleteNotification(notificationId)
  return Result.ok(notificationVO)
}))
