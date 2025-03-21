import { z } from 'zod'
import { descriptionSchema, idSchema, urlSchema } from '../models'

/**
 * 创建资源 Schema
 * @openapi
 * definitions:
 *   ResourceCreateRequest:
 *     type: object
 *     description: 创建资源
 *     required:
 *       - catalogId
 *       - key
 *       - size
 *       - bucket
 *     properties:
 *       catalogId:
 *         type: string
 *         description: 目录ID
 *       key:
 *         type: string
 *         description: 资源key
 *       description:
 *         type: string
 *         description: 描述
 *       metadata:
 *         type: object
 *         description: 元数据
 *       size:
 *         type: integer
 *         description: 大小
 *       url:
 *         type: string
 *         description: 网址
 *       bucket:
 *         type: string
 *         description: 存储桶
 */
export const resourceCreateRequestSchema = z.object({
  catalogId: idSchema,
  key: z.string(),
  description: descriptionSchema.optional(),
  metadata: z.record(z.any()).optional(),
  size: z.number().int().positive(),
  url: urlSchema.optional(),
  bucket: z.string(),
})
export type ResourceCreateRequest = z.infer<typeof resourceCreateRequestSchema>

/**
 * 更新资源 Schema
 * @openapi
 * definitions:
 *   ResourceUpdateRequest:
 *     type: object
 *     description: 更新资源
 *     properties:
 *       key:
 *         type: string
 *         description: 资源key
 *       description:
 *         type: string
 *         description: 描述
 *       metadata:
 *         type: object
 *         description: 元数据
 *       url:
 *         type: string
 *         description: 网址
 */
export const resourceUpdateRequestSchema = z.object({
  key: z.string().optional(),
  description: descriptionSchema.optional(),
  metadata: z.record(z.any()).optional(),
  url: urlSchema.optional(),
})
export type ResourceUpdateRequest = z.infer<typeof resourceUpdateRequestSchema>
