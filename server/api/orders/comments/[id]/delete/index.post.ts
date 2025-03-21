/**
 * @openapi
 * /api/orders/comments/{id}/delete:
 *   post:
 *     summary: 删除订单评论
 *     description: 管理员删除订单评论
 *     tags:
 *      - 订单
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 订单评论 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<OrderCommentVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const commentId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const orderCommentVO = await orderCommentService.deleteOrderComment(commentId, loginUserId)
  return Result.ok(orderCommentVO)
}))
