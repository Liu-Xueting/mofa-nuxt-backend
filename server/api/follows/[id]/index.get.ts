/**
 * @openapi
 * /api/follows/{id}:
 *   get:
 *     summary: 获取关注详情
 *     description: 获取关注详情信息。
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
  const followVO = await followService.getFollowById(followId)
  return Result.ok(followVO)
}))
