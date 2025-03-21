/**
 * @openapi
 * /api/addresses/{id}/delete:
 *   post:
 *     summary: 删除地址
 *     description: 用户删除地址
 *     tags:
 *      - 地址
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 地址 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<AddressVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const addressId = getPathId(event)
  const addressVO = await addressService.deleteAddress(addressId)
  return Result.ok(addressVO)
}))
