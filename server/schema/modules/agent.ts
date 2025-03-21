import { z } from 'zod'
import { nameSchema } from '../models'

/**
 * 创建代理 Schema
 * @openapi
 * definitions:
 *   AgentCreateRequest:
 *     type: object
 *     description: 创建代理
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         description: 代理名称
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
 *         description: 区域
 *       street:
 *         type: string
 *         description: 街道
 *       address:
 *         type: string
 *         description: 详细地址
 *       remark:
 *         type: string
 *         description: 备注
 *       status:
 *         type: string
 *         description: 状态
 */
export const agentCreateRequestSchema = z.object({
  name: nameSchema,
  phone: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  address: z.string().optional(),
  remark: z.string().optional(),
  status: z.string().optional(),
})
export type AgentCreateRequest = z.infer<typeof agentCreateRequestSchema>

/**
 * 更新代理 Schema
 * @openapi
 * definitions:
 *   AgentUpdateRequest:
 *     type: object
 *     description: 更新代理
 *     properties:
 *       name:
 *         type: string
 *         description: 代理名称
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
 *         description: 区域
 *       street:
 *         type: string
 *         description: 街道
 *       address:
 *         type: string
 *         description: 详细地址
 *       remark:
 *         type: string
 *         description: 备注
 *       status:
 *         type: string
 *         description: 状态
 */
export const agentUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  address: z.string().optional(),
  remark: z.string().optional(),
  status: z.string().optional(),
})
export type AgentUpdateRequest = z.infer<typeof agentUpdateRequestSchema>
