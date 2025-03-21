interface ErrorOptions {
  throwError?: boolean
  errorMessage?: string
}

/**
 * 检查是否是用户操作自己的数据
 * @param event
 * @param userId 数据对象的用户 ID，默认从路径中获取
 * @returns 是否是用户操作自己的数据
 */
export function checkIfIsSelf(event: H3Event, userId?: string, { throwError, errorMessage }: ErrorOptions = {}) {
  const res = getLoginUserId(event) === (userId ?? getPathId(event))
  if (!res && throwError) {
    throw new Error(errorMessage ?? '您无权操作其他用户的数据')
  }
  return res
}

/**
 * 检查是否是管理员
 * @param event
 * @returns 是否是管理员
 */
export function checkIfIsAdmin(event: H3Event, { throwError, errorMessage }: ErrorOptions = {}) {
  // TODO: 从数据库中查询用户是否是管理员
  const res = getLoginUserId(event) === 'admin'
  if (!res && throwError) {
    throw new Error(errorMessage ?? '您无权操作管理员')
  }
  return res
}

/**
 * 检查是否登录
 * @param event
 * @returns 是否登录
 */
export function checkIfIsLogin(event: H3Event, { throwError, errorMessage }: ErrorOptions = {}) {
  const res = !!getLoginUserId(event)
  if (!res && throwError) {
    throw new Error(errorMessage ?? '您需要登录')
  }
  return res
}
