import { ProductStatusType } from '@prisma/client'
import { z } from 'zod'
import { idSchema } from '../models'
/**
 * 搜索商品 Schema
 * @openapi
 * definitions:
 *   ProductSearchRequest:
 *     type: object
 *     description: 搜索商品
 *     required:
 *       - keyword
 *       - status
 *       - category
 *       - minPrice
 *       - maxPrice
 *     properties:
 *      keyword:
 *        type: string
 *        description: 搜索关键词
 *      status:
 *        type: enum
 *        enum: [ACTIVE, INACTIVE]
 *        description: 状态
 *      category:
 *        type: string
 *        description: 类别
 *      minPrice:
 *        type: number
 *        description: 最低价格
 *      maxPrice:
 *        type: number
 *        description: 最高价格
 */
export const productSearchRequestSchema = z.object({
  keyword: z.string().optional(),
  status: z.enum([
    ProductStatusType.ACTIVE,
    ProductStatusType.INACTIVE,
  ]).optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
})
export type ProductSearchRequest = z.infer<typeof productSearchRequestSchema>

/**
 * name: row.name,
  description: row.description,
  price: row.price,
  shopId: row.shopId,
  groupId: row.groupId,
  categories: row.categories,
  tags: row.tags,
 * 创建商品 Schema
 * @openapi
 * definitions:
 *   ProductCreateRequest:
 *     type: object
 *     description: 创建商品
 *     required:
 *      - name
 *      - price
 *      - shopId
 *      - groupId
 *      - categories
 *      - tags
 *     properties:
 *      name:
 *        type: string
 *        description: 商品名称
 *      price:
 *        type: number
 *        description: 价格
 *      shopId:
 *        type: string
 *        description: 店铺ID
 *      groupId:
 *        type: string
 *        description: 分组ID
 *      categories:
 *        type: array
 *        items:
 *          type: string
 *          description: 类别
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *            description: 标签
 */
export const productCreateRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  shopId: idSchema,
  groupId: z.string().optional(),
  categories: z.array(idSchema),
  tags: z.array(idSchema),
})
export type ProductCreateRequest = z.infer<typeof productCreateRequestSchema>

/**
 * 更新商品 Schema
 * @openapi
 * definitions:
 *   ProductUpdateRequest:
 *     type: object
 *     description: 更新商品
 *     required:
 *      - name
 *      - price
 *      - shopId
 *      - groupId
 *      - categories
 *      - tags
 *     properties:
 *      name:
 *        type: string
 *        description: 商品名称
 *      price:
 *        type: number
 *        description: 价格
 *      shopId:
 *        type: string
 *        description: 店铺ID
 *      groupId:
 *        type: string
 *        description: 分组ID
 *      categories:
 *        type: array
 *        items:
 *          type: string
 *          description: 类别
 *      tags:
 *          type: array
 *          items:
 *            type: string
 *            description: 标签
 *
 */
export const productUpdateRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  shopId: idSchema.optional(),
  groupId: z.string().optional(),
  categories: z.array(idSchema).optional(),
  tags: z.array(idSchema).optional(),
})
export type ProductUpdateRequest = z.infer<typeof productUpdateRequestSchema>

/**
 * 更新商品状态 Schema
 * @openapi
 * definitions:
 *   ProductStatusRequest:
 *     type: object
 *     description: 更新商品状态
 *     required:
 *      - status
 *     properties:
 *      status:
 *        type: enum
 *        enum: [ACTIVE, INACTIVE]
 *        description: 状态
 */
export const productStatusRequestSchema = z.object({
  status: z.enum([
    ProductStatusType.ACTIVE,
    ProductStatusType.INACTIVE,
  ]),
})
export type ProductStatusRequest = z.infer<typeof productStatusRequestSchema>
