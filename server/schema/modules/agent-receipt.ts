import { z } from 'zod'
import { descriptionSchema, idSchema } from '../models'

/**
 * 创建代理收款 Schema
 * @openapi
 * definitions:
 *   AgentReceiptCreateRequest:
 *     type: object
 *     description: 创建代理收款
 *     required:
 *       - agentId
 *       - amount
 *     properties:
 *       agentId:
 *         type: string
 *         description: 代理ID
 *       amount:
 *         type: string
 *         description: 金额
 *       type:
 *         type: string
 *         description: 类型
 *       status:
 *         type: string
 *         description: 状态
 *       remark:
 *         type: string
 *         description: 备注
 */
export const agentReceiptCreateRequestSchema = z.object({
  agentId: idSchema,
  amount: z.string(),
  type: z.string().optional(),
  status: z.string().optional(),
  remark: descriptionSchema.optional(),
})
export type AgentReceiptCreateRequest = z.infer<typeof agentReceiptCreateRequestSchema>

/**
 * 更新代理收款 Schema
 * @openapi
 * definitions:
 *   AgentReceiptUpdateRequest:
 *     type: object
 *     description: 更新代理收款
 *     properties:
 *       amount:
 *         type: string
 *         description: 金额
 *       type:
 *         type: string
 *         description: 类型
 *       status:
 *         type: string
 *         description: 状态
 *       remark:
 *         type: string
 *         description: 备注
 */
export const agentReceiptUpdateRequestSchema = z.object({
  amount: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  remark: descriptionSchema.optional(),
})
export type AgentReceiptUpdateRequest = z.infer<typeof agentReceiptUpdateRequestSchema>
