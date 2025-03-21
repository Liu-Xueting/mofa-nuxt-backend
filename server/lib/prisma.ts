/* eslint-disable no-restricted-globals */
import type { ITXClientDenyList } from '@prisma/client/runtime/library'
import process from 'node:process'

import { PrismaClient } from '@prisma/client'
import { TRANSACTION_ERROR_CODES, TRANSACTION_MAX_RETRIES } from '../constants/settings'

// #region Prisma Client
// Ref: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/prisma-nuxt-module#option-b-libprismats
function prismaClientSingleton() {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}

// #endregion

/**
 * 发起事务
 * @param fn 事务处理函数
 * @param options 选项
 * @param options.maxWait 最大等待时间
 * @param options.timeout 超时时间
 * @param max_retries 最大重试次数
 * @returns 结果
 */
export async function $transaction<R>(
  fn: (ctx: Omit<PrismaClient, ITXClientDenyList>) => Promise<R>,
  options?: { maxWait?: number, timeout?: number },
  max_retries: number = TRANSACTION_MAX_RETRIES,
): Promise<R | undefined> {
  let retries = 0
  let result
  do {
    try {
      result = await prisma.$transaction(fn, options)
      break
    } catch (error: any) {
      if (error.code && TRANSACTION_ERROR_CODES.includes(error.code)) {
        retries++
        continue
      }
      throw error
    }
  } while (retries <= max_retries)
  return result
}

async function onShutdown() {
  await prisma.$disconnect()
}
process.on('SIGINT', onShutdown)
process.on('SIGTERM', onShutdown)
