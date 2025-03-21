/**
 * @openapi
 * /api/cart/items/create:
 *   post:
 *     summary: 创建购物车商品
 *     description: 创建购物车商品
 *     tags:
 *      - 购物车
 *     requestBody:
 *       description: 购物车商品
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CartItemVO'
 *     responses:
 *       200:
 *         description: '`ResultType<CartItemVO>`'
 */
