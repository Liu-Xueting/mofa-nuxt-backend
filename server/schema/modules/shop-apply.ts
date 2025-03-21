import { ApplyStatusType } from '@prisma/client'
import { z } from 'zod'
import {
  datetimeSchema,
} from '../models'
/**
 * 创建商家申请 Schema
 * @openapi
 * definitions:
 *   ShopApplyCreateRequest:
 *     type: object
 *     description: 创建商家申请
 *     required:
 *       - realName
 *       - shopName
 *       - reason
 *       - phone
 *       - resources
 *     properties:
 *      realName:
 *        type: string
 *        description: 申请人
 *      shopName:
 *        type: string
 *        description: 店铺名称
 *      reason:
 *        type: string
 *        description: 申请理由
 *      phone:
 *        type: string
 *        description: 联系电话
 *      resources:
 *        type: array
 *        items:
 *          type: string
 *        description: 申请资源
 *
 *
 */
export const shopApplyCreateRequestSchema = z.object({
  realName: z.string(),
  shopName: z.string(),
  reason: z.string(),
  phone: z.string(),
  resources: z.array(z.string()),
})
export type ShopApplyCreateRequest = z.infer<typeof shopApplyCreateRequestSchema>

/**
 * 搜索店铺申请 Schema
 * @openapi
 * definitions:
 *   ShopApplySearchRequest:
 *     type: object
 *     description: 搜索店铺申请
 *     required:
 *       - keyword
 *     properties:
 *       keyword:
 *         type: string
 *         description: 搜索关键词
 *       status:
 *         type: string
 *         enum: [ACTIVE, INACTIVE, FORBIDDEN]
 *         description: 店铺申请状态
 *       createdAtFrom:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围开始
 *       createdAtTo:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围结束
 */
export const shopApplySearchRequestSchema = z.object({
  keyword: z.string(),
  status: z.enum([
    ApplyStatusType.APPROVED,
    ApplyStatusType.REJECTED,
    ApplyStatusType.PENDING,
  ]).optional(),
  createdAtFrom: datetimeSchema.optional(),
  createdAtTo: datetimeSchema.optional(),
})
export type ShopApplySearchRequest = z.infer<typeof shopApplySearchRequestSchema>

/**
 * 店铺申请状态
 * @openapi
 * definitions:
 *  ShopApplyStatusRequest:
 *    type: object
 *    description: 店铺申请状态
 *  required:
 *    - status
 *  properties:
 *    status:
 *      type: string
 *      enum: [APPROVED, REJECTED, PENDING]
 *      description: 店铺申请状态
 */
export const ShopApplyStatusSchema = z.object({
  status: z.enum([
    ApplyStatusType.APPROVED,
    ApplyStatusType.REJECTED,
    ApplyStatusType.PENDING,
  ]),
})
export type ShopApplyStatusRequest = z.infer<typeof ShopApplyStatusSchema>

/**
 * 店铺申请更新 Schema
 * @openapi
 * definitions:
 *   ShopApplyUpdateRequest:
 *     type: object
 *     description: 更新商家申请
 *     required:
 *       - realName
 *       - shopName
 *       - reason
 *       - phone
 *       - resources
 *     properties:
 *      realName:
 *        type: string
 *        description: 申请人
 *      shopName:
 *        type: string
 *        description: 店铺名称
 *      reason:
 *        type: string
 *        description: 申请理由
 *      phone:
 *        type: string
 *        description: 联系电话
 *      resources:
 *        type: array
 *        items:
 *          type: string
 *        description: 申请资源
 *
 */
export const shopApplyUpdateRequestSchema = z.object({
  realName: z.string().optional(),
  shopName: z.string().optional(),
  reason: z.string().optional(),
  phone: z.string().optional(),
  resources: z.array(z.string()).optional(),
})
export type ShopApplyUpdateRequest = z.infer<typeof shopApplyUpdateRequestSchema>
