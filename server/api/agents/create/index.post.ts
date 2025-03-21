/**
 * @openapi
 * /api/agents/create:
 *   post:
 *     summary: 创建代理 @todo
 *     description: 管理员创建代理。
 *     tags:
 *      - 代理
 *     requestBody:
 *       description: 代理创建信息
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AgentVO'
 *     responses:
 *       200:
 *         description: '`ResultType<AgentVO>`'
 */
