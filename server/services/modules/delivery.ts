import type { Delivery } from '@prisma/client'
import type { DeliveryCreateRequest, DeliveryUpdateRequest } from '~~/server/schema/modules/delivery'
import { AbstractService } from '..'
import { toDeliveryVO } from '../vo'

/**
 * 物流服务
 */
export class DeliveryService extends AbstractService<Delivery> {
  delegate = prisma.delivery

  /**
   * 转换为 VO
   * @param delivery 物流
   * @returns 物流 VO
   */
  toVO(delivery?: Delivery | null): DeliveryVO | null {
    return toDeliveryVO(delivery)
  }

  /**
   * 创建物流
   */
  async createDelivery(data: DeliveryCreateRequest, createdBy?: string) {
    const delivery = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(delivery)
  }

  /**
   * 通过 ID 获取物流
   * @param id 物流 ID
   * @returns 物流
   */
  async getDeliveryById(id: string) {
    const delivery = await this.getById(id, { isDeleted: false })
    return this.toVO(delivery)
  }

  /**
   * 更新物流
   */
  async updateDelivery(id: string, data: DeliveryUpdateRequest, updatedBy?: string) {
    const delivery = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(delivery)
  }

  /**
   * 删除物流
   * @param id 物流 ID
   * @param updatedBy 更新者
   */
  async deleteDelivery(id: string, updatedBy?: string) {
    const delivery = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(delivery)
  }
}

export const deliveryService = new DeliveryService()
