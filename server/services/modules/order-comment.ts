import type { OrderComment } from '@prisma/client'
import type { OrderCommentCreateRequest } from '~~/server/schema/modules/order-comment'
import { AbstractService } from '..'
import { toOrderCommentVO } from '../vo'

/**
 * 订单评论服务
 */
export class OrderCommentService extends AbstractService<OrderComment> {
  delegate = prisma.orderComment

  /**
   * 转换为 VO
   * @param orderComment 订单评论
   * @returns 订单评论 VO
   */
  toVO(orderComment?: OrderComment | null): OrderCommentVO | null {
    return toOrderCommentVO(orderComment)
  }

  /**
   * 创建订单评论
   */
  async createOrderComment(data: OrderCommentCreateRequest, createdBy?: string) {
    const orderComment = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(orderComment)
  }

  /**
   * 通过 ID 获取订单评论
   * @param id 订单评论 ID
   * @returns 订单评论
   */
  async getOrderCommentById(id: string) {
    const orderComment = await this.getById(id, { isDeleted: false })
    return this.toVO(orderComment)
  }

  /**
   * 更新订单评论
   */
  async updateOrderComment(id: string, data: OrderCommentCreateRequest, updatedBy?: string) {
    const orderComment = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(orderComment)
  }

  /**
   * 删除订单评论
   * @param id 订单评论 ID
   * @param updatedBy 更新者
   */
  async deleteOrderComment(id: string, updatedBy?: string) {
    const orderComment = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(orderComment)
  }
}

export const orderCommentService = new OrderCommentService()
