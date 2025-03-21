import { userRegisterRequestSchema } from '~~/server/schema/modules/user'

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: 注册用户
 *     description: 新用户注册
 *     tags:
 *      - 用户
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserRegisterRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<UserVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, userRegisterRequestSchema)
  const userVO = await userService.registerUser(body)
  return Result.ok(userVO)
}))
