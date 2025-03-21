import { z } from 'zod'
import { contentSchema, titleSchema } from '../models'

/**
 * 创建文章 Schema
 * @openapi
 * definitions:
 *   ArticleCreateRequest:
 *     type: object
 *     description: 创建文章
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *         description: 标题
 *       content:
 *         type: string
 *         description: 内容
 *       tags:
 *         type: array
 *         description: 标签列表
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 状态
 */
export const articleCreateRequestSchema = z.object({
  title: titleSchema,
  content: contentSchema.optional(),
  tags: z.array(z.string()).optional(),
  status: z.string().optional(),
})
export type ArticleCreateRequest = z.infer<typeof articleCreateRequestSchema>

/**
 * 更新文章 Schema
 * @openapi
 * definitions:
 *   ArticleUpdateRequest:
 *     type: object
 *     description: 更新文章
 *     properties:
 *       title:
 *         type: string
 *         description: 标题
 *       content:
 *         type: string
 *         description: 内容
 *       tags:
 *         type: array
 *         description: 标签列表
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 状态
 */
export const articleUpdateRequestSchema = z.object({
  title: titleSchema.optional(),
  content: contentSchema.optional(),
  tags: z.array(z.string()).optional(),
  status: z.string().optional(),
})
export type ArticleUpdateRequest = z.infer<typeof articleUpdateRequestSchema>
