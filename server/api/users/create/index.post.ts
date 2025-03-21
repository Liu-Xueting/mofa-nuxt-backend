import { userCreateRequestSchema } from '~~/server/schema/modules/user'

/**
 * @openapi
 * /api/users/create:
 *   post:
 *     summary: 创建用户
 *     description: 管理员可直接创建用户。
 *     tags:
 *      - 用户
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<>`'
 */
export default defineEventHandler(wrap(async (event) => {
  // @todo 鉴权
  const body = await validateBody(event, userCreateRequestSchema)
  const userVO = await userService.createUser(body)
  return Result.ok(userVO)
}))
