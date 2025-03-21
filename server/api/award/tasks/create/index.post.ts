/**
 * @openapi
 * /api/award/tasks/create:
 *   post:
 *     summary: 创建发包 @todo
 *     description: 创建发包任务
 *     tags:
 *      - 发包
 *     requestBody:
 *       description: 发包任务内容
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AwardTaskVO'
 *     responses:
 *       200:
 *         description: '`ResultType<AwardTaskVO>`'
 */
