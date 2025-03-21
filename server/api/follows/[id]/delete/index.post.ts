/**
 * @openapi
 * /api/follows/{id}/delete:
 *   post:
 *     summary: 删除关注
 *     description: 用户取消关注
 *     tags:
 *      - 关注
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 关注 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<FollowVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const followId = getPathId(event)
  const followVO = await followService.deleteFollow(followId)
  return Result.ok(followVO)
}))
