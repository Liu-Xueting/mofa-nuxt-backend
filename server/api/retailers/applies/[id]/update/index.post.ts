/**
 * @openapi
 * /api/retailers/applies/{id}/update:
 *   post:
 *     summary: 更新门店申请 @todo
 *     description: 更新门店申请。
 *     tags:
 *      - 门店
 *     requestBody:
 *       description: 更新门店申请信息
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RetailerApplyVO'
 *     responses:
 *       200:
 *         description: '`ResultType<RetailerApplyVO>`'
 */
