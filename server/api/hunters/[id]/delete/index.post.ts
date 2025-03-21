/**
 * @openapi
 * /api/hunters/{id}/delete:
 *   post:
 *     summary: 删除枪手
 *     description: 管理员删除枪手信息
 *     tags:
 *      - 枪手
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 枪手 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<HunterVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const hunterId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const hunterVO = await hunterService.deleteHunter(hunterId, loginUserId)
  return Result.ok(hunterVO)
}))
