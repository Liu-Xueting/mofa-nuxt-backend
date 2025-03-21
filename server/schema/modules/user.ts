import { UserStatusType } from '@prisma/client'
import { z } from 'zod'
import {
  datetimeSchema,
  emailSchema,
  genderSchema,
  nameSchema,
  passwordSchema,
  urlSchema,
  usernameSchema,
} from '../models'

/**
 * 创建用户 Schema
 * @openapi
 * definitions:
 *   UserCreateRequest:
 *     type: object
 *     description: 创建用户
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *         description: 用户名
 *       password:
 *         type: string
 *         description: 密码
 *       email:
 *         type: string
 *         description: 邮箱
 */
export const userCreateRequestSchema = z.object({
  username: usernameSchema,
  email: emailSchema.optional(),
  password: passwordSchema,
})
export type UserCreateRequest = z.infer<typeof userCreateRequestSchema>

/**
 * 更新用户 Schema
 * @openapi
 * definitions:
 *   UserUpdateRequest:
 *     type: object
 *     description: 更新用户
 *     properties:
 *       avatar:
 *         type: string
 *         format: url
 *         description: 头像URL
 *       nickname:
 *         type: string
 *         description: 昵称
 *       email:
 *         type: string
 *         format: email
 *         description: 邮箱
 *       birthday:
 *         type: string
 *         format: date-time
 *         description: 生日
 *       gender:
 *         type: string
 *         description: 性别
 */
export const userUpdateRequestSchema = z.object({
  avatar: urlSchema.optional(),
  nickname: nameSchema.optional(),
  email: emailSchema.optional(),
  birthday: datetimeSchema.optional(),
  gender: genderSchema.optional(),
})
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>

/**
 * 用户注册 Schema
 * @openapi
 * definitions:
 *   UserRegisterRequest:
 *     type: object
 *     description: 用户注册
 *     required:
 *       - username
 *       - password
 *       - email
 *     properties:
 *       username:
 *         type: string
 *         description: 用户名
 *       password:
 *         type: string
 *         description: 密码
 *       email:
 *         type: string
 *         description: 邮箱
 */
export const userRegisterRequestSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
})
export type UserRegisterRequest = z.infer<typeof userRegisterRequestSchema>

/**
 * 搜索用户 Schema
 * @openapi
 * definitions:
 *   UserSearchRequest:
 *     type: object
 *     description: 搜索用户
 *     required:
 *       - keyword
 *     properties:
 *       keyword:
 *         type: string
 *         description: 搜索关键词
 *       status:
 *         type: string
 *         enum: [ACTIVE, INACTIVE, FORBIDDEN]
 *         description: 用户状态
 *       createdAtFrom:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围开始
 *       createdAtTo:
 *         type: string
 *         format: date-time
 *         description: 创建时间范围结束
 */
export const userSearchRequestSchema = z.object({
  keyword: z.string(),
  status: z.enum([
    UserStatusType.ACTIVE,
    UserStatusType.INACTIVE,
    UserStatusType.FORBIDDEN,
  ]).optional(),
  createdAtFrom: datetimeSchema.optional(),
  createdAtTo: datetimeSchema.optional(),
})
export type UserSearchRequest = z.infer<typeof userSearchRequestSchema>

/**
 * 用户状态 Schema
 * @openapi
 * definitions:
 *   UserStatus:
 *     type: object
 *     description: 用户状态
 *     required:
 *       - status
 *     properties:
 *       status:
 *         type: string
 *         enum: [ACTIVE, INACTIVE, FORBIDDEN]
 *         description: 用户状态
 */
export const userStatusSchema = z.object({
  status: z.enum([
    UserStatusType.ACTIVE,
    UserStatusType.INACTIVE,
    UserStatusType.FORBIDDEN,
  ]),
})
export type UserStatus = z.infer<typeof userStatusSchema>
