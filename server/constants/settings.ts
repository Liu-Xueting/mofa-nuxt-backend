/**
 * 事务最大重试次数
 */
export const TRANSACTION_MAX_RETRIES = 3
/**
 * 事务重试错误代码
 */
export const TRANSACTION_ERROR_CODES = [
  'P2034',
]
/**
 * Token 过期时间 (ms)
 */
export const TOKEN_EXPIRES_TIME = 1000 * 60 * 60 * 24 * 30

/**
 * Token 更新时间 (ms)
 */
export const TOKEN_UPDATE_TIME = 1000 * 60 * 60 * 24 * 15
