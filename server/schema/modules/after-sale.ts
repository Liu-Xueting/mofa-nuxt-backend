import { z } from 'zod'
import { datetimeSchema, idSchema, textSchema } from '../models'

/**
 * 创建售后 Schema
 * @openapi
 * definitions:
 *   AfterSaleCreateRequest:
 *     type: object
 *     description: 创建售后
 *     required:
 *       - orderId
 *       - handle_time
 *     properties:
 *       orderId:
 *         type: string
 *         description: 订单ID
 *       type:
 *         type: string
 *         description: 售后类型
 *       status:
 *         type: string
 *         description: 售后状态
 *       reason:
 *         type: string
 *         description: 原因
 *       handle_time:
 *         type: string
 *         format: date-time
 *         description: 处理时间
 *       description:
 *         type: string
 *         description: 描述
 */
export const afterSaleCreateRequestSchema = z.object({
  orderId: idSchema,
  type: z.string().optional(),
  status: z.string().optional(),
  reason: z.string().optional(),
  handle_time: datetimeSchema,
  description: textSchema.optional(),
})
export type AfterSaleCreateRequest = z.infer<typeof afterSaleCreateRequestSchema>

/**
 * 更新售后 Schema
 * @openapi
 * definitions:
 *   AfterSaleUpdateRequest:
 *     type: object
 *     description: 更新售后
 *     properties:
 *       type:
 *         type: string
 *         description: 售后类型
 *       status:
 *         type: string
 *         description: 售后状态
 *       reason:
 *         type: string
 *         description: 原因
 *       handle_time:
 *         type: string
 *         format: date-time
 *         description: 处理时间
 *       description:
 *         type: string
 *         description: 描述
 */
export const afterSaleUpdateRequestSchema = z.object({
  type: z.string().optional(),
  status: z.string().optional(),
  reason: z.string().optional(),
  handle_time: datetimeSchema.optional(),
  description: textSchema.optional(),
})
export type AfterSaleUpdateRequest = z.infer<typeof afterSaleUpdateRequestSchema>
