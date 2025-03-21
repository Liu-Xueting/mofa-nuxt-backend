import { z } from 'zod'
import { idSchema, nameSchema } from '../models'

/**
 * 创建发包方 Schema
 * @openapi
 * definitions:
 *   EmployerCreateRequest:
 *     type: object
 *     description: 创建发包方
 *     required:
 *       - name
 *       - userId
 *     properties:
 *       name:
 *         type: string
 *         description: 发包方名称
 *       userId:
 *         type: string
 *         description: 用户ID
 */
export const employerCreateRequestSchema = z.object({
  name: nameSchema,
  userId: idSchema,
})
export type EmployerCreateRequest = z.infer<typeof employerCreateRequestSchema>

/**
 * 更新发包方 Schema
 * @openapi
 * definitions:
 *   EmployerUpdateRequest:
 *     type: object
 *     description: 更新发包方
 *     properties:
 *       name:
 *         type: string
 *         description: 发包方名称
 */
export const employerUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
})
export type EmployerUpdateRequest = z.infer<typeof employerUpdateRequestSchema>
