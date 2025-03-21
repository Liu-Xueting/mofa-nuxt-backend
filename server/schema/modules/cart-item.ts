import { z } from 'zod'
import { idSchema } from '../models'

/**
 * 创建购物车项目 Schema
 * @openapi
 * definitions:
 *   CartItemCreateRequest:
 *     type: object
 *     description: 创建购物车项目
 *     required:
 *       - skuId
 *       - userId
 *       - quantity
 *       - price
 *       - totalPrice
 *     properties:
 *       skuId:
 *         type: string
 *         description: SKU ID
 *       userId:
 *         type: string
 *         description: 用户ID
 *       status:
 *         type: string
 *         description: 状态
 *       quantity:
 *         type: integer
 *         description: 数量
 *       price:
 *         type: string
 *         description: 价格
 *       totalPrice:
 *         type: string
 *         description: 总价
 */
export const cartItemCreateRequestSchema = z.object({
  skuId: idSchema,
  userId: idSchema,
  status: z.string().optional(),
  quantity: z.number().int().positive(),
  price: z.string(),
  totalPrice: z.string(),
})
export type CartItemCreateRequest = z.infer<typeof cartItemCreateRequestSchema>

/**
 * 更新购物车项目 Schema
 * @openapi
 * definitions:
 *   CartItemUpdateRequest:
 *     type: object
 *     description: 更新购物车项目
 *     properties:
 *       status:
 *         type: string
 *         description: 状态
 *       quantity:
 *         type: integer
 *         description: 数量
 *       price:
 *         type: string
 *         description: 价格
 *       totalPrice:
 *         type: string
 *         description: 总价
 */
export const cartItemUpdateRequestSchema = z.object({
  status: z.string().optional(),
  quantity: z.number().int().positive().optional(),
  price: z.string().optional(),
  totalPrice: z.string().optional(),
})
export type CartItemUpdateRequest = z.infer<typeof cartItemUpdateRequestSchema>
