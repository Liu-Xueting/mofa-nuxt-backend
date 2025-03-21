import { z } from 'zod'
import { descriptionSchema, idSchema, nameSchema } from '../models'

/**
 * 创建资源目录 Schema
 * @openapi
 * definitions:
 *   ResourceCatalogCreateRequest:
 *     type: object
 *     description: 创建资源目录
 *     required:
 *       - userId
 *       - name
 *     properties:
 *       parentId:
 *         type: string
 *         description: 父目录ID
 *       userId:
 *         type: string
 *         description: 用户ID
 *       name:
 *         type: string
 *         description: 名称
 *       description:
 *         type: string
 *         description: 描述
 */
export const resourceCatalogCreateRequestSchema = z.object({
  parentId: idSchema.optional(),
  userId: idSchema,
  name: nameSchema,
  description: descriptionSchema.optional(),
})
export type ResourceCatalogCreateRequest = z.infer<typeof resourceCatalogCreateRequestSchema>

/**
 * 更新资源目录 Schema
 * @openapi
 * definitions:
 *   ResourceCatalogUpdateRequest:
 *     type: object
 *     description: 更新资源目录
 *     properties:
 *       parentId:
 *         type: string
 *         description: 父目录ID
 *       name:
 *         type: string
 *         description: 名称
 *       description:
 *         type: string
 *         description: 描述
 */
export const resourceCatalogUpdateRequestSchema = z.object({
  parentId: idSchema.optional(),
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
})
export type ResourceCatalogUpdateRequest = z.infer<typeof resourceCatalogUpdateRequestSchema>
