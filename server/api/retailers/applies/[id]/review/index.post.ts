/**
 * @openapi
 * /api/retailers/applies/{id}/review:
 *   post:
 *     summary: 审核门店申请 @todo
 *     description: 管理员审核门店申请
 *     tags:
 *      - 门店
 *     requestBody:
 *       description: 审核意见
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RetailerApplyVO'
 *     responses:
 *       200:
 *         description: '`ResultType<RetailerApplyVO>`'
 */
