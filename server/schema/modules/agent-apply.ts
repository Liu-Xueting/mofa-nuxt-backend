import { z } from 'zod'
import { descriptionSchema, idSchema, nameSchema } from '../models'

/**
 * 创建代理申请 Schema
 * @openapi
 * definitions:
 *   AgentApplyCreateRequest:
 *     type: object
 *     description: 创建代理申请
 *     required:
 *       - realName
 *       - agentName
 *       - reason
 *       - phone
 *       - resources
 *     properties:
 *       realName:
 *         type: string
 *         description: 真实姓名
 *       agentName:
 *         type: string
 *         description: 代理名称
 *       reason:
 *         type: string
 *         description: 申请理由
 *       phone:
 *         type: string
 *         description: 联系电话
 *       resources:
 *         type: array
 *         description: 资源列表
 *         items:
 *           type: string
 *       remark:
 *         type: string
 *         description: 备注
 */
export const agentApplyCreateRequestSchema = z.object({
  realName: nameSchema,
  agentName: nameSchema,
  reason: descriptionSchema,
  phone: z.string(),
  resources: z.array(z.string()),
  remark: descriptionSchema.optional(),
})
export type AgentApplyCreateRequest = z.infer<typeof agentApplyCreateRequestSchema>

/**
 * 更新代理申请 Schema
 * @openapi
 * definitions:
 *   AgentApplyUpdateRequest:
 *     type: object
 *     description: 更新代理申请
 *     properties:
 *       realName:
 *         type: string
 *         description: 真实姓名
 *       agentName:
 *         type: string
 *         description: 代理名称
 *       reason:
 *         type: string
 *         description: 申请理由
 *       phone:
 *         type: string
 *         description: 联系电话
 *       resources:
 *         type: array
 *         description: 资源列表
 *         items:
 *           type: string
 *       status:
 *         type: string
 *         description: 状态
 *       agentId:
 *         type: string
 *         description: 关联的代理ID
 *       remark:
 *         type: string
 *         description: 备注
 */
export const agentApplyUpdateRequestSchema = z.object({
  realName: nameSchema.optional(),
  agentName: nameSchema.optional(),
  reason: descriptionSchema.optional(),
  phone: z.string().optional(),
  resources: z.array(z.string()).optional(),
  status: z.string().optional(),
  agentId: idSchema.optional(),
  remark: descriptionSchema.optional(),
})
export type AgentApplyUpdateRequest = z.infer<typeof agentApplyUpdateRequestSchema>
