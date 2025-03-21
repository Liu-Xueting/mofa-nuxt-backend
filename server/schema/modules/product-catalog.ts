import { z } from 'zod'
import { descriptionSchema, idSchema, nameSchema } from '../models'

/**
 * 创建商品目录 Schema
 * @openapi
 * definitions:
 *   ProductCatalogCreateRequest:
 *     type: object
 *     description: 创建商品目录
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         description: 目录名称
 *       description:
 *         type: string
 *         description: 描述
 *       parentId:
 *         type: string
 *         description: 父级目录 ID
 */
export const productCatalogCreateRequestSchema = z.object({
  name: nameSchema,
  description: descriptionSchema.optional(),
  parentId: idSchema.optional(),
})
export type ProductCatalogCreateRequest = z.infer<typeof productCatalogCreateRequestSchema>

/**
 * 更新商品目录 Schema
 * @openapi
 * definitions:
 *   ProductCatalogUpdateRequest:
 *     type: object
 *     description: 更新商品目录
 *     properties:
 *       name:
 *         type: string
 *         description: 目录名称
 *       description:
 *         type: string
 *         description: 描述
 *       parentId:
 *         type: string
 *         description: 父级目录 ID
 */
export const productCatalogUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
  parentId: idSchema.optional(),
})
export type ProductCatalogUpdateRequest = z.infer<typeof productCatalogUpdateRequestSchema>

/**
 * 搜索商品目录 Schema
 * @openapi
 * definitions:
 *  ProductCatalogSearchRequest:
 *    type: object
 *    description: 搜索商品目录
 *    properties:
 *      keyword:
 *        type: string
 *        description: 关键字
 *
 */
export const productCatalogSearchRequestSchema = z.object({
  keyword: z.string().optional(),
})
export type ProductCatalogSearchRequest = z.infer<typeof productCatalogSearchRequestSchema>
