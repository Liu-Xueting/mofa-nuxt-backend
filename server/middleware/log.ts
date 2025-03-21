import { consola } from 'consola'

/**
 * 日志中间件，简单记录日志
 */
export default defineEventHandler(async (event) => {
  try {
    if (!event.path.startsWith('/api/')) {
      return
    }
    consola.info('[log]', event.method, event.path)
  } catch (error) {
    console.error('Middleware [log]:', error)
  }
})
