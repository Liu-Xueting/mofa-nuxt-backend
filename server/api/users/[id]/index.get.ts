/**
 * 通过 ID 查询用户信息
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: 通过 ID 查询用户信息
 *     description: 需要鉴权，登录用户可请求。
 *     tags:
 *      - 用户
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 用户 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<UserVO>` 用户信息'
 */
export default defineEventHandler(wrap(async (event) => {
  checkIfIsLogin(event, { throwError: true })
  const userId = getPathId(event)
  const userVO = await userService.getUser(userId)
  return Result.ok(userVO)
}))
