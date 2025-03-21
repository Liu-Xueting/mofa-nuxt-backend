import { z } from 'zod'
import { descriptionSchema, nameSchema, permKeySchema } from '../models'

/**
 * 权限创建 Schema
 * @openapi
 * definitions:
 *   PermissionCreateRequest:
 *     type: object
 *     required:
 *       - name
 *       - permKey
 *     properties:
 *       name:
 *         type: string
 *         description: 权限名
 *       description:
 *         type: string
 *         description: 描述
 *       menuId:
 *         type: string
 *         description: 菜单 ID
 *       permKey:
 *         type: string
 *         description: 权限键
 */
export const permissionCreateRequestSchema = z.object({
  name: nameSchema,
  description: descriptionSchema.optional(),
  // menuId: idSchema.optional(),
  permKey: z.string(),
})
export type PermissionCreateRequest = z.infer<typeof permissionCreateRequestSchema>

/**
 * 搜索权限
 * @openapi
 * definitions:
 *  PermissionSearchRequest:
 *   type: object
 *   required:
 *    - name
 *   properties:
 *     name:
 *      type: string
 *      description: 权限名
 *
 */
export const permissionSearchRequestSchema = z.object({
  name: z.string(),
})
export type PermissionSearchRequest = z.infer<typeof permissionSearchRequestSchema>

/**
 * 权限更新 Schema
 * @openapi
 * definitions:
 *   PermissionUpdateRequest:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: 权限名
 *       description:
 *         type: string
 *         description: 描述
 *       menuId:
 *         type: string
 *         description: 菜单 ID
 *       permKey:
 *         type: string
 *         description: 权限键
 */
export const permissionUpdateRequestSchema = z.object({
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
  // menuId: idSchema.optional(),
  permKey: permKeySchema.optional(),
})
export type PermissionUpdateRequest = z.infer<typeof permissionUpdateRequestSchema>
