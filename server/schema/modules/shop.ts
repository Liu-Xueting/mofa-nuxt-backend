import { z } from 'zod'
import {
  datetimeSchema,
  descriptionSchema,
} from '../models'

/**
 * 搜索店铺 Schema
 * @openapi
 * definitions:
 *   UserSearchRequest:
 *     type: object
 *     description: 搜索店铺
 *     required:
 *       - keyword
 *     properties:
 *       keyword:
 *         type: string
 *         description: 搜索关键词
 *       status:
 *         type: string
 *         enum: [ACTIVE, INACTIVE, FORBIDDEN]
 *         description: 店铺状态
 *       createdAtFrom:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围开始
 *       createdAtTo:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围结束
 */
export const shopSearchRequestSchema = z.object({
  keyword: z.string(),
  status: z.string().optional(),
  createdAtFrom: datetimeSchema.optional(),
  createdAtTo: datetimeSchema.optional(),
})
export type ShopSearchRequest = z.infer<typeof shopSearchRequestSchema>

/**
 * name: name || '',
  description: description || '',
  qualification: qualification || '',
  province: province || '',
  city: city || '',
  district: district || '',
  street: street || '',
  address: address || '',
 * 更新店铺 Schema
 * @openapi
 * definitions:
 *  ShopUpdateRequest:
 *    type: object
 *    description: 更新店铺
 *    required:
 *      - name
 *      - description
 *      - qualification
 *      - province
 *      - city
 *      - district
 *      - street
 *      - address
 *    properties:
 *    name:
 *      type: string
 *      description: 店铺名称
 *    description:
 *      type: string
 *      description: 店铺描述
 *    qualification:
 *      type: string
 *      description: 店铺资质
 *    province:
 *      type: string
 *      description: 省份
 *    city:
 *      type: string
 *      description: 城市
 *    district:
 *      type: string
 *      description: 区县
 *    street:
 *      type: string
 *      description: 街道
 *    address:
 *      type: string
 *      description: 详细地址
 *
 *
 */
export const shopUpdateRequestSchema = z.object({
  name: z.string().optional(),
  description: descriptionSchema.optional(),
  qualification: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  address: z.string().optional(),
})
export type ShopUpdateRequest = z.infer<typeof shopUpdateRequestSchema>

/**
 * 创建店铺 Schema
 * @openapi
 * definitions:
 * ShopCreateRequest:
 *  required:
 *      - name
 *      - description
 *      - qualification
 *      - province
 *      - city
 *      - district
 *      - street
 *      - address
 *    properties:
 *    name:
 *      type: string
 *      description: 店铺名称
 *    description:
 *      type: string
 *      description: 店铺描述
 *    qualification:
 *      type: string
 *      description: 店铺资质
 *    province:
 *      type: string
 *      description: 省份
 *    city:
 *      type: string
 *      description: 城市
 *    district:
 *      type: string
 *      description: 区县
 *    street:
 *      type: string
 *      description: 街道
 *    address:
 *      type: string
 *      description: 详细地址
 */
export const shopCreateRequestSchema = z.object({
  name: z.string(),
  description: descriptionSchema.optional(),
  qualification: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  address: z.string().optional(),
})
export type ShopCreateRequest = z.infer<typeof shopCreateRequestSchema>
