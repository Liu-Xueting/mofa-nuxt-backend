import { z } from 'zod'
import { idSchema } from '../models'

/**
 * 创建订单项 Schema
 * @openapi
 * definitions:
 *   OrderItemCreateRequest:
 *     type: object
 *     description: 创建订单项
 *     required:
 *       - orderId
 *       - skuId
 *       - quantity
 *     properties:
 *       orderId:
 *         type: string
 *         description: 订单ID
 *       skuId:
 *         type: string
 *         description: 商品SKU ID
 *       quantity:
 *         type: integer
 *         description: 数量
 *       status:
 *         type: string
 *         description: 状态
 *       remark:
 *         type: string
 *         description: 备注
 *       discount:
 *         type: string
 *         description: 折扣
 */
export const orderItemCreateRequestSchema = z.object({
  orderId: idSchema,
  skuId: idSchema,
  quantity: z.number().int().positive(),
  status: z.string().optional(),
  remark: z.string().optional(),
  discount: z.string().optional(),
})
export type OrderItemCreateRequest = z.infer<typeof orderItemCreateRequestSchema>

/**
 * 更新订单项 Schema
 * @openapi
 * definitions:
 *   OrderItemUpdateRequest:
 *     type: object
 *     description: 更新订单项
 *     properties:
 *       quantity:
 *         type: integer
 *         description: 数量
 *       status:
 *         type: string
 *         description: 状态
 *       remark:
 *         type: string
 *         description: 备注
 *       discount:
 *         type: string
 *         description: 折扣
 */
export const orderItemUpdateRequestSchema = z.object({
  quantity: z.number().int().positive().optional(),
  status: z.string().optional(),
  remark: z.string().optional(),
  discount: z.string().optional(),
})
export type OrderItemUpdateRequest = z.infer<typeof orderItemUpdateRequestSchema>
