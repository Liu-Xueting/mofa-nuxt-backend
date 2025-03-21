import { z } from 'zod'
import { idSchema, textSchema } from '../models'

/**
 * 创建订单评论 Schema
 * @openapi
 * definitions:
 *   OrderCommentCreateRequest:
 *     type: object
 *     description: 创建订单评论
 *     required:
 *       - orderItemId
 *       - userId
 *       - content
 *     properties:
 *       orderItemId:
 *         type: string
 *         description: 订单项ID
 *       userId:
 *         type: string
 *         description: 用户ID
 *       content:
 *         type: string
 *         description: 评论内容
 *       resources:
 *         type: array
 *         description: 资源列表
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 状态
 */
export const orderCommentCreateRequestSchema = z.object({
  orderItemId: idSchema,
  userId: idSchema,
  content: textSchema,
  resources: z.array(z.string()).optional(),
  status: z.string().optional(),
})
export type OrderCommentCreateRequest = z.infer<typeof orderCommentCreateRequestSchema>

/**
 * 更新订单评论 Schema
 * @openapi
 * definitions:
 *   OrderCommentUpdateRequest:
 *     type: object
 *     description: 更新订单评论
 *     properties:
 *       content:
 *         type: string
 *         description: 评论内容
 *       resources:
 *         type: array
 *         description: 资源列表
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 状态
 */
export const orderCommentUpdateRequestSchema = z.object({
  content: textSchema.optional(),
  resources: z.array(z.string()).optional(),
  status: z.string().optional(),
})
export type OrderCommentUpdateRequest = z.infer<typeof orderCommentUpdateRequestSchema>
