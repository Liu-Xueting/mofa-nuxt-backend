import type { DeliveryItem } from '@prisma/client'
import type { DeliveryItemCreateRequest, DeliveryItemUpdateRequest } from '~~/server/schema/modules/delivery-item'
import { AbstractService } from '..'
import { toDeliveryItemVO } from '../vo'

/**
 * 物流项服务
 */
export class DeliveryItemService extends AbstractService<DeliveryItem> {
  delegate = prisma.deliveryItem

  /**
   * 转换为 VO
   * @param deliveryItem 物流项
   * @returns 物流项 VO
   */
  toVO(deliveryItem?: DeliveryItem | null): DeliveryItemVO | null {
    return toDeliveryItemVO(deliveryItem)
  }

  /**
   * 创建物流项
   */
  async createDeliveryItem(data: DeliveryItemCreateRequest) {
    const deliveryItem = await this.delegate.create({ data })
    return this.toVO(deliveryItem)
  }

  /**
   * 通过 ID 获取物流项
   * @param id 物流项 ID
   * @returns 物流项
   */
  async getDeliveryItemById(id: string) {
    const deliveryItem = await this.getById(id, { isDeleted: false })
    return this.toVO(deliveryItem)
  }

  /**
   * 更新物流项
   */
  async updateDeliveryItem(id: string, data: DeliveryItemUpdateRequest) {
    const deliveryItem = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(deliveryItem)
  }

  /**
   * 删除物流项
   * @param id 物流项 ID
   */
  async deleteDeliveryItem(id: string) {
    const deliveryItem = await this.delegate.update({
      where: { id },
      data: { isDeleted: true },
    })
    return this.toVO(deliveryItem)
  }
}

export const deliveryItemService = new DeliveryItemService()
