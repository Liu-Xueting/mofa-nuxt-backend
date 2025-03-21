import { addressCreateRequestSchema } from '~~/server/schema/modules/address'

/**
 * @openapi
 * /api/addresses/create:
 *   post:
 *     summary: 创建地址
 *     description: 返回创建的新地址
 *     tags:
 *      - 地址
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AddressCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<AddressVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, addressCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const addressVO = await addressService.createAddress(loginUserId, body)
  return Result.ok(addressVO)
}))
