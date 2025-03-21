import { z } from 'zod'
import { datetimeSchema, idSchema, textSchema } from '../models'

/**
 * 订单状态枚举
 */
export const orderStatusEnum = z.enum(['PENDING', 'PAID', 'DELIVERED', 'RECEIVED', 'CANCELED', 'REFUNDED'])

/**
 * 创建订单 Schema
 * @openapi
 * definitions:
 *   OrderCreateRequest:
 *     type: object
 *     description: 创建订单
 *     required:
 *       - userId
 *       - addressId
 *       - transactionId
 *       - totalAmount
 *       - orderedAt
 *     properties:
 *       userId:
 *         type: string
 *         description: 用户ID
 *       addressId:
 *         type: string
 *         description: 地址ID
 *       transactionId:
 *         type: string
 *         description: 交易ID
 *       description:
 *         type: string
 *         description: 描述
 *       totalAmount:
 *         type: string
 *         description: 总金额
 *       status:
 *         type: string
 *         enum: [PENDING, PAID, DELIVERED, RECEIVED, CANCELED, REFUNDED]
 *         description: 订单状态
 *       orderedAt:
 *         type: string
 *         format: date-time
 *         description: 下单时间
 *       paidAt:
 *         type: string
 *         format: date-time
 *         description: 支付时间
 *       remark:
 *         type: string
 *         description: 备注
 */
export const orderCreateRequestSchema = z.object({
  userId: idSchema,
  addressId: idSchema,
  transactionId: idSchema,
  description: textSchema.optional(),
  totalAmount: z.string(),
  status: orderStatusEnum.default('PENDING'),
  orderedAt: datetimeSchema,
  paidAt: datetimeSchema.optional(),
  remark: z.string().optional(),
})
export type OrderCreateRequest = z.infer<typeof orderCreateRequestSchema>

/**
 * 更新订单 Schema
 * @openapi
 * definitions:
 *   OrderUpdateRequest:
 *     type: object
 *     description: 更新订单
 *     properties:
 *       description:
 *         type: string
 *         description: 描述
 *       status:
 *         type: string
 *         enum: [PENDING, PAID, DELIVERED, RECEIVED, CANCELED, REFUNDED]
 *         description: 订单状态
 *       paidAt:
 *         type: string
 *         format: date-time
 *         description: 支付时间
 *       remark:
 *         type: string
 *         description: 备注
 */
export const orderUpdateRequestSchema = z.object({
  description: textSchema.optional(),
  status: orderStatusEnum.optional(),
  paidAt: datetimeSchema.optional(),
  remark: z.string().optional(),
})
export type OrderUpdateRequest = z.infer<typeof orderUpdateRequestSchema>
