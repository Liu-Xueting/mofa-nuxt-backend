import type { Order } from '@prisma/client'
import type { OrderCreateRequest, OrderUpdateRequest } from '~~/server/schema/modules/order'
import { AbstractService } from '..'
import { toOrderVO } from '../vo'

/**
 * 订单服务
 */
export class OrderService extends AbstractService<Order> {
  delegate = prisma.order

  /**
   * 转换为 VO
   * @param order 订单
   * @returns 订单 VO
   */
  toVO(order?: Order | null): OrderVO | null {
    return toOrderVO(order)
  }

  /**
   * 创建订单
   */
  async createOrder(data: OrderCreateRequest, createdBy?: string) {
    const order = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(order)
  }

  /**
   * 通过 ID 获取订单
   * @param id 订单 ID
   * @returns 订单
   */
  async getOrderById(id: string) {
    const order = await this.getById(id, { isDeleted: false })
    return this.toVO(order)
  }

  /**
   * 更新订单
   */
  async updateOrder(id: string, data: OrderUpdateRequest, updatedBy?: string) {
    const order = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(order)
  }

  /**
   * 删除订单
   * @param id 订单 ID
   * @param updatedBy 更新者
   */
  async deleteOrder(id: string, updatedBy?: string) {
    const order = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(order)
  }
}

export const orderService = new OrderService()
