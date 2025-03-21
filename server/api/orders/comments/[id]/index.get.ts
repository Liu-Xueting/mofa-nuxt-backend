/**
 * @openapi
 * /api/orders/comments/{id}:
 *   get:
 *     summary: 获取订单评论详情
 *     description: 获取特定订单评论的详细信息。
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
  const commentVO = await orderCommentService.getOrderCommentById(commentId)
  return Result.ok(commentVO)
}))
