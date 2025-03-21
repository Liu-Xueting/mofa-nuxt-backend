import { z } from 'zod'
import { datetimeSchema } from '../models'

/**
 * 创建交易 Schema
 * @openapi
 * definitions:
 *   TransactionCreateRequest:
 *     type: object
 *     description: 创建交易
 *     required:
 *       - amount
 *       - time
 *     properties:
 *       amount:
 *         type: string
 *         description: 金额
 *       time:
 *         type: string
 *         format: date-time
 *         description: 交易时间
 *       type:
 *         type: string
 *         description: 交易类型
 *       status:
 *         type: string
 *         description: 交易状态
 *       remark:
 *         type: string
 *         description: 备注
 */
export const transactionCreateRequestSchema = z.object({
  amount: z.string(),
  time: datetimeSchema,
  type: z.string().optional(),
  status: z.string().optional(),
  remark: z.string().optional(),
})
export type TransactionCreateRequest = z.infer<typeof transactionCreateRequestSchema>

/**
 * 更新交易 Schema
 * @openapi
 * definitions:
 *   TransactionUpdateRequest:
 *     type: object
 *     description: 更新交易
 *     properties:
 *       amount:
 *         type: string
 *         description: 金额
 *       time:
 *         type: string
 *         format: date-time
 *         description: 交易时间
 *       type:
 *         type: string
 *         description: 交易类型
 *       status:
 *         type: string
 *         description: 交易状态
 *       remark:
 *         type: string
 *         description: 备注
 */
export const transactionUpdateRequestSchema = z.object({
  amount: z.string().optional(),
  time: datetimeSchema.optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  remark: z.string().optional(),
})
export type TransactionUpdateRequest = z.infer<typeof transactionUpdateRequestSchema>
