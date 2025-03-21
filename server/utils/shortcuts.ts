import type { ZodObject, ZodRawShape } from 'zod'

/**
 * 使用 Zod 验证请求体
 * @param event 事件
 * @param schema Zod Schema
 * @returns 结果
 */
export async function validateBody<T extends ZodRawShape>(
  event: H3Event,
  schema: ZodObject<T>,
) {
  const body = await readValidatedBody(event, o => schema.safeParse(o))
  if (!body.success) {
    throw new Error(body.error.message)
  }
  return body.data
}
