/**
 * @openapi
 * /api/addresses/{id}:
 *   get:
 *     summary: 获取地址详情
 *     description: 获取地址详情信息。
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
  const addressVO = await addressService.getAddressById(addressId)
  return Result.ok(addressVO)
}))
