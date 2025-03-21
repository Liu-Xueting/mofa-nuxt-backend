import { z } from 'zod'
import { descriptionSchema, idSchema, nameSchema } from '../models'

/**
 * 创建菜单 Schema
 * @openapi
 * definitions:
 *   MenuCreateRequest:
 *     type: object
 *     description: 创建菜单
 *     required:
 *       - name
 *     properties:
 *       permissionId:
 *         type: string
 *         description: 权限ID
 *       name:
 *         type: string
 *         description: 菜单名称
 *       description:
 *         type: string
 *         description: 菜单描述
 *       type:
 *         type: string
 *         description: 菜单类型
 *       icon:
 *         type: string
 *         description: 图标
 *       path:
 *         type: string
 *         description: 路径
 *       parentId:
 *         type: string
 *         description: 父级菜单ID
 *       order:
 *         type: integer
 *         description: 排序
 *       isExternal:
 *         type: boolean
 *         description: 是否外部链接
 *       isVisible:
 *         type: boolean
 *         description: 是否可见
 */
export const menuCreateRequestSchema = z.object({
  permissionId: idSchema.optional(),
  name: nameSchema,
  description: descriptionSchema.optional(),
  type: z.string().optional(),
  icon: z.string().optional(),
  path: z.string().optional(),
  parentId: idSchema.optional(),
  order: z.number().int().optional(),
  isExternal: z.boolean().optional(),
  isVisible: z.boolean().optional(),
})
export type MenuCreateRequest = z.infer<typeof menuCreateRequestSchema>

/**
 * 更新菜单 Schema
 * @openapi
 * definitions:
 *   MenuUpdateRequest:
 *     type: object
 *     description: 更新菜单
 *     properties:
 *       permissionId:
 *         type: string
 *         description: 权限ID
 *       name:
 *         type: string
 *         description: 菜单名称
 *       description:
 *         type: string
 *         description: 菜单描述
 *       type:
 *         type: string
 *         description: 菜单类型
 *       icon:
 *         type: string
 *         description: 图标
 *       path:
 *         type: string
 *         description: 路径
 *       parentId:
 *         type: string
 *         description: 父级菜单ID
 *       order:
 *         type: integer
 *         description: 排序
 *       isExternal:
 *         type: boolean
 *         description: 是否外部链接
 *       isVisible:
 *         type: boolean
 *         description: 是否可见
 */
export const menuUpdateRequestSchema = z.object({
  permissionId: idSchema.optional(),
  name: nameSchema.optional(),
  description: descriptionSchema.optional(),
  type: z.string().optional(),
  icon: z.string().optional(),
  path: z.string().optional(),
  parentId: idSchema.optional(),
  order: z.number().int().optional(),
  isExternal: z.boolean().optional(),
  isVisible: z.boolean().optional(),
})
export type MenuUpdateRequest = z.infer<typeof menuUpdateRequestSchema>

/**
 * 搜索角色 Schema
 * @openapi
 * definitions:
 *  RoleSearchRequest:
 *   type: object
 *   description: 搜索菜单
 *   properties:
 *     keyWord:
 *       type: string
 *       description: 关键字
 *       required: false
 *       default: ''
 *     type:
 *      type: string
 *      description: 菜单类型
 *      required: false
 *
 *
 */
export const menuSearchRequestSchema = z.object({
  keyWord: z.string().optional(),
  type: z.string().optional(),
})
export type MenuSearchRequest = z.infer<typeof menuSearchRequestSchema>
