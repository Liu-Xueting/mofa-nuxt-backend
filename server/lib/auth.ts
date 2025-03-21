import crypto from 'node:crypto'

import { hash, verify } from '@node-rs/argon2'

/**
 * 哈希密码
 * @param password 密码
 * @param abortSignal 终止信号
 * @returns 哈希后的密码
 */
export async function hashPassword(password: string, abortSignal?: AbortSignal) {
  return hash(password, {}, abortSignal)
}

/**
 * 验证密码
 * @param hashed 哈希后的密码
 * @param password 密码
 * @param abortSignal 终止信号
 * @returns 是否匹配
 */
export async function verifyPassword(hashed: string, password: string, abortSignal?: AbortSignal) {
  return verify(hashed, password, {}, abortSignal)
}

/**
 * 计算 SHA256
 * @param t 字符串
 * @returns Base64 字符串
 */
export async function sha256(t: string) {
  return crypto.createHash('sha256').update(t).digest('base64url')
}
