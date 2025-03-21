import { z } from 'zod'
/**
 * 搜索商品标签 Schema
 * @openapi
 * definitions:
 *   ProductTagSearchRequest:
 *     type: object
 *     description: 搜索商品标签
 *     required:
 *       - keyword
 *     properties:
 *       keyword:
 *         type: string
 *         description: 搜索关键词
 */
export const productTagSearchRequestSchema = z.object({
  keyword: z.string(),
})
export type ProductTagSearchRequest = z.infer<typeof productTagSearchRequestSchema>

/**
 * 创建商品标签 Schema
 * @openapi
 * definitions:
 *  ProductTagCreateRequest:
 *    type: object
 *    description: 创建商品标签
 *    required:
 *      - name
 *      - description
 *    properties:
 *      name:
 *        type: string
 *        description: 标签名称
 *      description:
 *        type: string
 *        description: 描述
 *
 */
export const productTagCreateRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
})
export type ProductTagCreateRequest = z.infer<typeof productTagCreateRequestSchema>

/**
 * 更新商品标签 Schema
 * @openapi
 * definitions:
 *  ProductTagUpdateRequest:
 *    type: object
 *    description: 更新商品标签
 *    properties:
 *      name:
 *        type: string
 *        description: 标签名称
 *      description:
 *        type: string
 *        description: 描述
 *
 */
export const productTagUpdateRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})
export type ProductTagUpdateRequest = z.infer<typeof productTagUpdateRequestSchema>
