/**
 * @openapi
 * /api/cart/items/{id}/delete:
 *   post:
 *     summary: 删除购物车项目
 *     description: 用户删除购物车中的项目
 *     tags:
 *      - 购物车
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 购物车项目 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<CartItemVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const itemId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const cartItemVO = await cartItemService.deleteCartItem(itemId, loginUserId)
  return Result.ok(cartItemVO)
}))
