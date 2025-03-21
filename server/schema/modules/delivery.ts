import { z } from 'zod'
import { idSchema, nameSchema } from '../models'

/**
 * 创建物流 Schema
 * @openapi
 * definitions:
 *   DeliveryCreateRequest:
 *     type: object
 *     description: 创建物流
 *     required:
 *       - orderId
 *       - company
 *       - number
 *     properties:
 *       orderId:
 *         type: string
 *         description: 订单ID
 *       company:
 *         type: string
 *         description: 快递公司
 *       number:
 *         type: string
 *         description: 快递单号
 */
export const deliveryCreateRequestSchema = z.object({
  orderId: idSchema,
  company: nameSchema,
  number: z.string(),
})
export type DeliveryCreateRequest = z.infer<typeof deliveryCreateRequestSchema>

/**
 * 更新物流 Schema
 * @openapi
 * definitions:
 *   DeliveryUpdateRequest:
 *     type: object
 *     description: 更新物流
 *     properties:
 *       company:
 *         type: string
 *         description: 快递公司
 *       number:
 *         type: string
 *         description: 快递单号
 */
export const deliveryUpdateRequestSchema = z.object({
  company: nameSchema.optional(),
  number: z.string().optional(),
})
export type DeliveryUpdateRequest = z.infer<typeof deliveryUpdateRequestSchema>
