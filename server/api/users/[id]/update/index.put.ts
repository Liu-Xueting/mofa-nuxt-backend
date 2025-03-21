import { userUpdateRequestSchema } from '~~/server/schema/modules/user'

/**
 * @openapi
 * /api/users/{id}/update:
 *   post:
 *     summary: 更新用户信息
 *     description: 更新用户信息
 *     tags:
 *      - 用户
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<UserVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权，用户自身或管理员
  const body = await validateBody(event, userUpdateRequestSchema)
  const userId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const userVO = await userService.updateUser(userId, body, loginUserId)
  return Result.ok(userVO)
}))
