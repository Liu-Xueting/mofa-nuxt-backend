import { z } from 'zod'
import { datetimeSchema, idSchema } from '../models'

/**
 * 创建物流项 Schema
 * @openapi
 * definitions:
 *   DeliveryItemCreateRequest:
 *     type: object
 *     description: 创建物流项
 *     required:
 *       - deliveryId
 *       - deliveryTime
 *     properties:
 *       deliveryId:
 *         type: string
 *         description: 物流ID
 *       status:
 *         type: string
 *         description: 状态
 *       deliveryTime:
 *         type: string
 *         format: date-time
 *         description: 配送时间
 */
export const deliveryItemCreateRequestSchema = z.object({
  deliveryId: idSchema,
  status: z.string().optional(),
  deliveryTime: datetimeSchema,
})
export type DeliveryItemCreateRequest = z.infer<typeof deliveryItemCreateRequestSchema>

/**
 * 更新物流项 Schema
 * @openapi
 * definitions:
 *   DeliveryItemUpdateRequest:
 *     type: object
 *     description: 更新物流项
 *     properties:
 *       status:
 *         type: string
 *         description: 状态
 *       deliveryTime:
 *         type: string
 *         format: date-time
 *         description: 配送时间
 */
export const deliveryItemUpdateRequestSchema = z.object({
  status: z.string().optional(),
  deliveryTime: datetimeSchema.optional(),
})
export type DeliveryItemUpdateRequest = z.infer<typeof deliveryItemUpdateRequestSchema>
