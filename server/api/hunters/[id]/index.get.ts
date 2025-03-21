/**
 * @openapi
 * /api/hunters/{id}:
 *   get:
 *     summary: 获取枪手详情
 *     description: 获取枪手详情信息。
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
  const hunterVO = await hunterService.getHunterById(hunterId)
  return Result.ok(hunterVO)
}))
