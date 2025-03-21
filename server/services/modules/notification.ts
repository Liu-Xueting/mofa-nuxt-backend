import type { Notification } from '@prisma/client'
import type { NotificationCreateRequest } from '~~/server/schema/modules/notification'
import { AbstractService } from '..'
import { toNotificationVO } from '../vo'

/**
 * 通知服务
 */
export class NotificationService extends AbstractService<Notification> {
  delegate = prisma.notification

  /**
   * 转换为 VO
   * @param notification 通知
   * @returns 通知 VO
   */
  toVO(notification?: Notification | null): NotificationVO | null {
    return toNotificationVO(notification)
  }

  /**
   * 创建通知
   */
  async createNotification(data: NotificationCreateRequest) {
    const notification = await this.delegate.create({
      data,
    })
    return this.toVO(notification)
  }

  /**
   * 通过 ID 获取通知
   * @param id 通知 ID
   * @returns 通知
   */
  async getNotificationById(id: string) {
    const notification = await this.getById(id, { isDeleted: false })
    return this.toVO(notification)
  }

  /**
   * 更新通知
   */
  async updateNotification(id: string, data: NotificationCreateRequest) {
    const notification = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(notification)
  }

  /**
   * 删除通知
   * @param id 通知 ID
   */
  async deleteNotification(id: string) {
    const notification = await this.delegate.update({
      where: { id },
      data: { isDeleted: true },
    })
    return this.toVO(notification)
  }
}

export const notificationService = new NotificationService()
