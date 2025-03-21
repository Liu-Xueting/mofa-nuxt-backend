import type { OrderItem } from '@prisma/client'
import type { OrderItemCreateRequest } from '~~/server/schema/modules/order-item'
import { AbstractService } from '..'
import { toOrderItemVO } from '../vo'

/**
 * 订单项服务
 */
export class OrderItemService extends AbstractService<OrderItem> {
  delegate = prisma.orderItem

  /**
   * 转换为 VO
   * @param orderItem 订单项
   * @returns 订单项 VO
   */
  toVO(orderItem?: OrderItem | null): OrderItemVO | null {
    return toOrderItemVO(orderItem)
  }

  /**
   * 创建订单项
   */
  async createOrderItem(data: OrderItemCreateRequest) {
    const orderItem = await this.delegate.create({
      data: { ...data },
    })
    return this.toVO(orderItem)
  }

  /**
   * 通过 ID 获取订单项
   * @param id 订单项 ID
   * @returns 订单项
   */
  async getOrderItemById(id: string) {
    const orderItem = await this.getById(id, { isDeleted: false })
    return this.toVO(orderItem)
  }

  /**
   * 更新订单项
   */
  async updateOrderItem(id: string, data: OrderItemCreateRequest) {
    const orderItem = await this.delegate.update({
      where: { id },
      data: { ...data },
    })
    return this.toVO(orderItem)
  }

  /**
   * 删除订单项
   * @param id 订单项 ID
   */
  async deleteOrderItem(id: string) {
    const orderItem = await this.delegate.update({
      where: { id },
      data: { isDeleted: true },
    })
    return this.toVO(orderItem)
  }
}

export const orderItemService = new OrderItemService()
