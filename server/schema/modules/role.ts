import { z } from 'zod'
import { descriptionSchema, idSchema, nameSchema } from '../models'

/**
 * 创建角色 Schema
 * @openapi
 * definitions:
 *   RoleCreateRequest:
 *     type: object
 *     description: 创建角色
 *     required:
 *       - name
 *       - permissions
 *     properties:
 *       name:
 *         type: string
 *         description: 角色名
 *       description:
 *         type: string
 *         description: 描述
 *       permissions:
 *         type: array
 *         description: 权限列表
 *         items:
 *           type: string
 */
export const roleCreateRequestSchema = z.object({
  name: nameSchema,
  description: descriptionSchema.optional(),
  permissions: z.array(idSchema),
})
export type RoleCreateRequest = z.infer<typeof roleCreateRequestSchema>

/**
 * 更新角色 Schema
 * @openapi
 * definitions:
 *   RoleUpdateRequest:
 *     type: object
 *     description: 更新角色
 *     properties:
 *       name:
 *         type: string
 *         description: 角色名
 *       description:
 *         type: string
 *         description: 描述
 *       permissions:
 *         type: array
 *         description: 权限列表
 *         items:
 *           type: string
 */
export const roleUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
  permissions: z.array(idSchema).optional(),
})
export type RoleUpdateRequest = z.infer<typeof roleUpdateRequestSchema>

/**
 * 搜索角色 Schema
 * @openapi
 * definitions:
 *  RoleSearchRequest:
 *   type: object
 *   description: 搜索角色
 *   properties:
 *     keyWord:
 *       type: string
 *       description: 关键字
 *       required: false
 *       default: ''
 *
 */
export const roleSearchRequestSchema = z.object({
  keyWord: z.string().optional(),
})
export type RoleSearchRequest = z.infer<typeof roleSearchRequestSchema>
