/**
 * @openapi
 * /api/employers/{id}:
 *   get:
 *     summary: 获取发包方详情
 *     description: 获取发包方详情信息。
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
  const employerVO = await employerService.getEmployerById(employerId)
  return Result.ok(employerVO)
}))
