import type { EventHandler, EventHandlerRequest, EventHandlerResponse, H3Event } from 'h3'

type Awaitable<T> = T | PromiseLike<T>

/**
 * 包装函数的错误处理过程
 * @param func 被包裹的函数
 * @returns 新的事件处理函数
 */
export function wrap<
  Request extends EventHandlerRequest = EventHandlerRequest,
  Response = EventHandlerResponse,
>(
  func: EventHandler<Request, Awaitable<Response>>,
): EventHandler<Request, Awaitable<Response>> {
  return async function (event: H3Event) {
    try {
      return await func(event)
    } catch (error) {
      console.error(error)
      return Result.fail('Internal Server Error') as Response
    }
  }
}
