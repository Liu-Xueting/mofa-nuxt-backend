/**
 * @openapi
 * /api/cart/items/{id}:
 *   get:
 *     summary: 获取购物车项详情
 *     description: 获取购物车项详情信息。
 *     tags:
 *      - 购物车
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 购物车项 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<CartItemVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const itemId = getPathId(event)
  const cartItemVO = await cartItemService.getCartItemById(itemId)
  return Result.ok(cartItemVO)
}))
