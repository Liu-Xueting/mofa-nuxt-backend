import { z } from 'zod'
import { idSchema, textSchema, titleSchema } from '../models'

/**
 * 创建通知 Schema
 * @openapi
 * definitions:
 *   NotificationCreateRequest:
 *     type: object
 *     description: 创建通知
 *     required:
 *       - userId
 *       - title
 *     properties:
 *       userId:
 *         type: string
 *         description: 用户ID
 *       title:
 *         type: string
 *         description: 标题
 *       content:
 *         type: string
 *         description: 内容
 *       actions:
 *         type: array
 *         description: 动作
 *         items:
 *           type: object
 *       type:
 *         type: string
 *         description: 类型
 *       status:
 *         type: string
 *         description: 状态
 */
export const notificationCreateRequestSchema = z.object({
  userId: idSchema,
  title: titleSchema,
  content: textSchema.optional(),
  actions: z.array(z.record(z.any())).optional(),
  type: z.string().optional(),
  status: z.string().optional(),
})
export type NotificationCreateRequest = z.infer<typeof notificationCreateRequestSchema>

/**
 * 更新通知 Schema
 * @openapi
 * definitions:
 *   NotificationUpdateRequest:
 *     type: object
 *     description: 更新通知
 *     properties:
 *       title:
 *         type: string
 *         description: 标题
 *       content:
 *         type: string
 *         description: 内容
 *       actions:
 *         type: array
 *         description: 动作
 *         items:
 *           type: object
 *       type:
 *         type: string
 *         description: 类型
 *       status:
 *         type: string
 *         description: 状态
 */
export const notificationUpdateRequestSchema = z.object({
  title: titleSchema.optional(),
  content: textSchema.optional(),
  actions: z.array(z.record(z.any())).optional(),
  type: z.string().optional(),
  status: z.string().optional(),
})
export type NotificationUpdateRequest = z.infer<typeof notificationUpdateRequestSchema>
