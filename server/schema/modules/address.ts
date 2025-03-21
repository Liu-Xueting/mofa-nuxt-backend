import { z } from 'zod'
import { nameSchema } from '../models'

/**
 * 创建地址 Schema
 * @openapi
 * definitions:
 *   AddressCreateRequest:
 *     type: object
 *     description: 创建地址
 *     required:
 *       - recipient
 *       - phone
 *       - address
 *     properties:
 *       recipient:
 *         type: string
 *         description: 收件人
 *       phone:
 *         type: string
 *         description: 电话
 *       province:
 *         type: string
 *         description: 省份
 *       city:
 *         type: string
 *         description: 城市
 *       district:
 *         type: string
 *         description: 区/县
 *       street:
 *         type: string
 *         description: 街道
 *       address:
 *         type: string
 *         description: 详细地址
 *       isDefault:
 *         type: boolean
 *         description: 是否默认地址
 */
export const addressCreateRequestSchema = z.object({
  recipient: nameSchema,
  phone: z.string(),
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  address: z.string(),
  isDefault: z.boolean().optional(),
})
export type AddressCreateRequest = z.infer<typeof addressCreateRequestSchema>

/**
 * 更新地址 Schema
 * @openapi
 * definitions:
 *   AddressUpdateRequest:
 *     type: object
 *     description: 更新地址
 *     properties:
 *       recipient:
 *         type: string
 *         description: 收件人
 *       phone:
 *         type: string
 *         description: 电话
 *       province:
 *         type: string
 *         description: 省份
 *       city:
 *         type: string
 *         description: 城市
 *       district:
 *         type: string
 *         description: 区/县
 *       street:
 *         type: string
 *         description: 街道
 *       address:
 *         type: string
 *         description: 详细地址
 *       isDefault:
 *         type: boolean
 *         description: 是否默认地址
 */
export const addressUpdateRequestSchema = z.object({
  recipient: nameSchema.optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  address: z.string().optional(),
  isDefault: z.boolean().optional(),
})
export type AddressUpdateRequest = z.infer<typeof addressUpdateRequestSchema>
