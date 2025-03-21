import { z } from 'zod'
import { datetimeSchema, descriptionSchema, nameSchema } from '../models'

/**
 * 创建商品分类 Schema
 * @openapi
 * definitions:
 *   ProductCategoryCreateRequest:
 *     type: object
 *     description: 创建商品分类
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         description: 分类名称
 *       description:
 *         type: string
 *         description: 描述
 */
export const productCategoryCreateRequestSchema = z.object({
  name: nameSchema,
  description: descriptionSchema.optional(),
})
export type ProductCategoryCreateRequest = z.infer<typeof productCategoryCreateRequestSchema>

/**
 * 更新商品分类 Schema
 * @openapi
 * definitions:
 *   ProductCategoryUpdateRequest:
 *     type: object
 *     description: 更新商品分类
 *     properties:
 *       name:
 *         type: string
 *         description: 分类名称
 *       description:
 *         type: string
 *         description: 描述
 */
export const productCategoryUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
})
export type ProductCategoryUpdateRequest = z.infer<typeof productCategoryUpdateRequestSchema>

/**
 * 搜索商品分类 Schema
 * @openapi
 * definitions:
 *   ProductCategorySearchRequest:
 *     type: object
 *     description: 搜索商品分类
 *     required:
 *       - keyword
 *     properties:
 *       keyword:
 *         type: string
 *         description: 搜索关键词
 *       isDeleted:
 *         type: boolean
 *         description: 是否删除
 *       createdAtFrom:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围开始
 *       createdAtTo:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围结束
 */
export const productCategorySearchRequestSchema = z.object({
  keyword: z.string(),
  isDeleted: z.boolean().optional(),
  createdAtFrom: datetimeSchema.optional(),
  createdAtTo: datetimeSchema.optional(),
})
export type ProductCategorySearchRequest = z.infer<typeof productCategorySearchRequestSchema>
