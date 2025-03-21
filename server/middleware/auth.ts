/**
 * 鉴权中间件，用于解析 Token 并获取用户信息
 */
export default defineEventHandler(async (event) => {
  try {
    if (!event.path.startsWith('/api/')) {
      return
    }
    const session = await getServerSession(event)
    if (!session) {
      return
    }
    const token = await getToken({ event })
    const userId = token?.sub

    event.context.decodedSession = session
    event.context.token = token
    event.context.userId = userId
  } catch (error) {
    console.error('Middleware [auth]:', error)
  }
})
