/**
 * @openapi
 * /api/retailers/applies/{id}:
 *   get:
 *     summary: 获取门店申请
 *     description: 获取门店申请详情。
 *     tags:
 *      - 门店
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 门店申请 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<RetailerApply>`'
 */
