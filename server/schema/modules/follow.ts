import { z } from 'zod'
import { idSchema } from '../models'

/**
 * 创建关注 Schema
 * @openapi
 * definitions:
 *   FollowCreateRequest:
 *     type: object
 *     description: 创建关注
 *     required:
 *       - userId
 *     properties:
 *       userId:
 *         type: string
 *         description: 用户ID
 *       shopId:
 *         type: string
 *         description: 店铺ID
 *       status:
 *         type: string
 *         description: 状态
 */
export const followCreateRequestSchema = z.object({
  userId: idSchema,
  shopId: idSchema.optional(),
  status: z.string().optional(),
})
export type FollowCreateRequest = z.infer<typeof followCreateRequestSchema>

/**
 * 更新关注 Schema
 * @openapi
 * definitions:
 *   FollowUpdateRequest:
 *     type: object
 *     description: 更新关注
 *     properties:
 *       status:
 *         type: string
 *         description: 状态
 */
export const followUpdateRequestSchema = z.object({
  status: z.string().optional(),
})
export type FollowUpdateRequest = z.infer<typeof followUpdateRequestSchema>
