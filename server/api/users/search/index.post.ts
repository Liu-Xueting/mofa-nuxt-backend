import { userSearchRequestSchema } from '~~/server/schema/modules/user'

/**
 * @openapi
 * /api/users/search:
 *   post:
 *     summary: 搜索用户
 *     description: 管理员搜索用户列表。
 *     tags:
 *      - 用户
 *     parameters:
 *      - name: page
 *        in: query
 *        description: 页码
 *        required: false
 *        type: integer
 *        default: 1
 *      - name: size
 *        in: query
 *        description: 每页数量
 *        required: false
 *        type: integer
 *        default: 10
 *     requestBody:
 *       description: 搜索条件
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<UserVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, userSearchRequestSchema)
  const page = await getPageQuery(event)
  const users = await userService.searchUsers(body, page)
  return Result.ok(users)
}))
