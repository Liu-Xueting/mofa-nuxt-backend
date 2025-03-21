/**
 * @openapi
 * /api/employers/{id}/delete:
 *   post:
 *     summary: 删除发包方
 *     description: 管理员删除发包方信息
 *     tags:
 *      - 发包
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 发包方 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<EmployerVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const employerId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const employerVO = await employerService.deleteEmployer(employerId, loginUserId)
  return Result.ok(employerVO)
}))
