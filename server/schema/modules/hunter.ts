import { z } from 'zod'
import { nameSchema } from '../models'

/**
 * 创建枪手 Schema
 * @openapi
 * definitions:
 *   HunterCreateRequest:
 *     type: object
 *     description: 创建枪手
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         description: 枪手名称
 *       phone:
 *         type: string
 *         description: 电话
 *       address:
 *         type: string
 *         description: 地址
 */
export const hunterCreateRequestSchema = z.object({
  name: nameSchema,
  phone: z.string().optional(),
  address: z.string().optional(),
})
export type HunterCreateRequest = z.infer<typeof hunterCreateRequestSchema>

/**
 * 更新枪手 Schema
 * @openapi
 * definitions:
 *   HunterUpdateRequest:
 *     type: object
 *     description: 更新枪手
 *     properties:
 *       name:
 *         type: string
 *         description: 枪手名称
 *       phone:
 *         type: string
 *         description: 电话
 *       address:
 *         type: string
 *         description: 地址
 */
export const hunterUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})
export type HunterUpdateRequest = z.infer<typeof hunterUpdateRequestSchema>
