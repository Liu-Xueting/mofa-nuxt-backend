import { userStatusSchema } from '~~/server/schema/modules/user'
/**
 * 修改用户状态
 * @openapi
 * /api/users/{id}/status:
 *  put:
 *   summary: 修改用户状态
 *   description: 修改用户状态
 *   tags:
 *     - 用户
 *   parameters:
 *     - name: id
 *       in: path
 *       description: 用户ID
 *       required: true
 *       type: string
 *     - name: status
 *       in: body
 *       description: 用户状态
 *       required: true
 *
 */
export default defineEventHandler(wrap(async (event) => {
  const id = getPathId(event)
  const body = await validateBody(event, userStatusSchema)
  const userVo = await userService.updateUserStatus(id, body)
  return Result.ok(userVo)
}))
