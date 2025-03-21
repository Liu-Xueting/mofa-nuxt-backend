/**
 * @openapi
 * /api/users/{id}/delete:
 *   post:
 *     summary: 删除用户
 *     description: 管理员删除用户
 *     tags:
 *      - 用户
 *     responses:
 *       200:
 *         description: '`ResultType<UserVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const userId = getPathId(event)
  const userVO = await userService.deleteUser(userId)
  return Result.ok(userVO)
}))
