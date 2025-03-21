import { addressUpdateRequestSchema } from '~~/server/schema/modules/address'

/**
 * @openapi
 * /api/addresses/{id}/update:
 *   post:
 *     summary: 更新地址
 *     description: 用户更新地址信息。
 *     tags:
 *      - 地址
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AddressUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<AddressVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, addressUpdateRequestSchema)
  const addressId = getPathId(event)
  const addressVO = await addressService.updateAddress(addressId, body)
  return Result.ok(addressVO)
}))
