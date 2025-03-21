import { idSchema, languageSchema, pageQuerySchema } from '../schema/models'

/**
 * 获取语言
 * @param event 事件
 * @returns 语言代码
 */
export function getLang(event: H3Event): GlobalLocale {
  return languageSchema.parse(event.context.lang)
}

/**
 * 获取登录用户 ID
 * @param event 事件
 * @returns 用户 ID
 */
export function getLoginUserId(event: H3Event): string {
  return idSchema.parse(event.context.userId)
}

/**
 * 获取查询路径 ID 参数
 * @param event 事件
 * @returns 查询参数
 */
export function getPathId(event: H3Event): string {
  return idSchema.parse(event.context.params?.id)
}

/**
 * 获取分页参数
 * @param event 事件
 * @param defaultPage 默认页码
 * @param defaultSize 默认每页大小
 * @returns 分页参数
 */
export async function getPageQuery(event: H3Event, defaultPage = 1, defaultSize = 10) {
  const result = await getValidatedQuery(event, async query => pageQuerySchema.safeParseAsync(query))
  if (!result.success) {
    return { page: defaultPage, size: defaultSize }
  }
  const { page, size } = result.data
  const res = {
    page: page ? Number.parseInt(page) : defaultPage,
    size: size ? Number.parseInt(size) : defaultSize,
  }
  return {
    page: Math.min(1000, Math.max(1, res.page)),
    size: Math.min(100, Math.max(1, res.size)),
  }
}
