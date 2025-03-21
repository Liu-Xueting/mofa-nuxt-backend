/**
 * @openapi
 * /api/retailers/applies/create:
 *   post:
 *     summary: 门店创建申请
 *     description: 门店申请。
 *     tags:
 *      - 门店
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RetailerApplyCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<RetailerApplyVO>`'
 */
