import type { Session } from '@prisma/client'
import { AbstractService } from '..'

/**
 * 会话服务，由框架接管
 */
export class SessionService extends AbstractService<Session> {
  delegate = prisma.session
}

export const sessionService = new SessionService()
