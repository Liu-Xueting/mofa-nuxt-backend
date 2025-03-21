import { z } from 'zod'
import { Languages } from '~~/config/i18n'

// #region 通用 Schemas
/**
 * MongoDB ID 正则表达式
 */
export const idRegex = /^[0-9a-f]{24}$/i

/**
 * ID Schema
 */
export const idSchema = z.string().regex(idRegex)

/**
 * 路径 ID 参数
 */
export const pathSchema = z.object({
  id: idSchema,
})

/**
 * 数字字符串
 */
export const numberString = z.string().max(10).regex(/^\d+$/)

/**
 * 分页查询参数
 */
export const pageQuerySchema = z.object({
  page: numberString.optional(),
  size: numberString.optional(),
})

/**
 * 语言代码
 */
export const languageSchema = z.enum(Languages)

// #endregion

// #region 业务 Schemas
/**
 * 一般名称 Schema
 */
export const nameSchema = z.string().min(1).max(32)
/**
 * 标题 Schema
 */
export const titleSchema = z.string().min(1).max(64)
/**
 * 稍长名称 Schema
 */
export const longNameSchema = z.string().min(1).max(128)
/**
 * 描述 Schema
 */
export const descriptionSchema = z.string().min(1).max(255)
/**
 * 长文本 Schema
 */
export const textSchema = z.string().min(1).max(2046)
/**
 * 文章内容 Schema
 */
export const contentSchema = z.string().min(1).max(65534)
/**
 * URL Schema
 */
export const urlSchema = z.string().max(255).url()
/**
 * 时间日期 Schema
 */
export const datetimeSchema = z.string().datetime()
/**
 * 用户名正则表达式
 */
export const usernameRegex = /^\w{3,24}$/
/**
 * 用户名 Schema
 */
export const usernameSchema = z.string()
  .min(3)
  .max(24)
  .regex(usernameRegex)
/**
 * 密码正则表达式
 */
export const passwordRegex = /^(?=.*[a-z])(?=.*\d)[\x20-\x7E]{8,32}$/
/**
 * 密码 Schema
 */
export const passwordSchema = z.string()
  .min(8)
  .max(32)
  .regex(passwordRegex)
/**
 * 邮箱 Schema
 */
export const emailSchema = z.string().email()
/**
 * 性别 Schema
 */
export const genderSchema = z.string().min(1).max(8).or(z.null())
/**
 * 权限 Key Schema
 */
// export const permKeySchema = z.string().regex(/^[a-z\-]{5,32}$/)

/**
 * 权限 Key Schema
 */
export const permKeySchema = z.string().min(5).max(32)

/**
 * 手机号  Schema
 */
export const phoneSchema = z.string().regex(/^1[3-9]\d{9}$/)
// #endregion
