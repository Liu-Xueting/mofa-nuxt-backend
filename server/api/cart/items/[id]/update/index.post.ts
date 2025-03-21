/**
 * @openapi
 * /api/cart/items/{id}/update:
 *   post:
 *     summary: 更新购物车商品
 *     description: 更新购物车商品
 *     tags:
 *      - 购物车
 *     requestBody:
 *       description: 更新购物车商品
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CartItemVO'
 *     responses:
 *       200:
 *         description: '`ResultType<CarItemVO>`'
 */
