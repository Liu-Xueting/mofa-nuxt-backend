import { z } from 'zod'
import { descriptionSchema, idSchema, nameSchema } from '../models'

/**
 * 创建商品分组 Schema
 * @openapi
 * definitions:
 *   ProductGroupCreateRequest:
 *     type: object
 *     description: 创建商品分组
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         description: 分组名称
 *       description:
 *         type: string
 *         description: 描述
 *       parentId:
 *         type: string
 *         description: 父级分组 ID
 */
export const productGroupCreateRequestSchema = z.object({
  name: nameSchema,
  description: descriptionSchema.optional(),
  parentId: idSchema.optional(),
})
export type ProductGroupCreateRequest = z.infer<typeof productGroupCreateRequestSchema>

/**
 * 更新商品分组 Schema
 * @openapi
 * definitions:
 *   ProductGroupUpdateRequest:
 *     type: object
 *     description: 更新商品分组
 *     properties:
 *       name:
 *         type: string
 *         description: 分组名称
 *       description:
 *         type: string
 *         description: 描述
 *       parentId:
 *         type: string
 *         description: 父级分组 ID
 */
export const productGroupUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
  parentId: idSchema.optional(),
})
export type ProductGroupUpdateRequest = z.infer<typeof productGroupUpdateRequestSchema>

/**
 * 搜索商品分组 Schema
 * @openapi
 * definitions:
 *  ProductGroupSearchRequest:
 *    type: object
 *    description: 搜索商品分组
 *    properties:
 *      keyword:
 *        type: string
 *        description: 关键字
 *
 */
export const productGroupSearchRequestSchema = z.object({
  keyword: z.string().optional(),
})
export type ProductGroupSearchRequest = z.infer<typeof productGroupSearchRequestSchema>
