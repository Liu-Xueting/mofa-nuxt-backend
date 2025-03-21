import { ApplyStatusType } from '@prisma/client'
import { z } from 'zod'
import {
  datetimeSchema,
} from '../models'

/**
 * 搜索门店申请 Schema
 * @openapi
 * definitions:
 *   RetailerApplySearchRequest:
 *     type: object
 *     description: 搜索门店申请
 *     required:
 *       - keyword
 *     properties:
 *       keyword:
 *         type: string
 *         description: 搜索关键词
 *       status:
 *         type: string
 *         enum: [ACTIVE, INACTIVE, FORBIDDEN]
 *         description: 门店申请状态
 *       createdAtFrom:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围开始
 *       createdAtTo:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围结束
 */
export const retailerApplySearchRequestSchema = z.object({
  keyword: z.string(),
  status: z.enum([
    ApplyStatusType.APPROVED,
    ApplyStatusType.REJECTED,
    ApplyStatusType.PENDING,
  ]).optional(),
  createdAtFrom: datetimeSchema.optional(),
  createdAtTo: datetimeSchema.optional(),
})
export type RetailerApplySearchRequest = z.infer<typeof retailerApplySearchRequestSchema>

/**
 * 门店申请状态
 * @openapi
 * definitions:
 *  RetailerApplyStatusRequest:
 *    type: object
 *    description: 门店申请状态
 *  required:
 *    - status
 *  properties:
 *    status:
 *      type: string
 *      enum: [APPROVED, REJECTED, PENDING]
 *      description: 门店申请状态
 */
export const RetailerApplyStatusRequestSchema = z.object({
  status: z.enum([
    ApplyStatusType.APPROVED,
    ApplyStatusType.REJECTED,
    ApplyStatusType.PENDING,
  ]),
})
export type RetailerApplyStatusRequest = z.infer<typeof RetailerApplyStatusRequestSchema>
