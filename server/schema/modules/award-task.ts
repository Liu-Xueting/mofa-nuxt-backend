import { z } from 'zod'
import { idSchema, textSchema, titleSchema } from '../models'

/**
 * 创建发包任务 Schema
 * @openapi
 * definitions:
 *   AwardTaskCreateRequest:
 *     type: object
 *     description: 创建发包任务
 *     required:
 *       - title
 *       - price
 *       - employer
 *     properties:
 *       title:
 *         type: string
 *         description: 任务标题
 *       content:
 *         type: string
 *         description: 任务内容
 *       price:
 *         type: number
 *         description: 任务价格
 *       employer:
 *         type: string
 *         description: 发包方ID
 *       status:
 *         type: string
 *         description: 任务状态
 */
export const awardTaskCreateRequestSchema = z.object({
  title: titleSchema,
  content: textSchema.optional(),
  price: z.number().positive(),
  employer: idSchema,
  status: z.string().optional(),
})
export type AwardTaskCreateRequest = z.infer<typeof awardTaskCreateRequestSchema>

/**
 * 更新发包任务 Schema
 * @openapi
 * definitions:
 *   AwardTaskUpdateRequest:
 *     type: object
 *     description: 更新发包任务
 *     properties:
 *       title:
 *         type: string
 *         description: 任务标题
 *       content:
 *         type: string
 *         description: 任务内容
 *       price:
 *         type: number
 *         description: 任务价格
 *       status:
 *         type: string
 *         description: 任务状态
 */
export const awardTaskUpdateRequestSchema = z.object({
  title: titleSchema.optional(),
  content: textSchema.optional(),
  price: z.number().positive().optional(),
  status: z.string().optional(),
})
export type AwardTaskUpdateRequest = z.infer<typeof awardTaskUpdateRequestSchema>
