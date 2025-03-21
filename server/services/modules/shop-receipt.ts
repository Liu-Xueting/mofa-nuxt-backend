import type { ShopReceipt } from '@prisma/client'
import { AbstractService } from '..'
import { toShopReceiptVO } from '../vo'

/**
 * 店铺收款服务
 */
export class ShopReceiptService extends AbstractService<ShopReceipt> {
  delegate = prisma.shopReceipt

  /**
   * 转换为 VO
   * @param shopReceipt 店铺收款
   * @returns 店铺 VO
   */
  toVO(shopReceipt?: ShopReceipt | null): ShopReceiptVO | null {
    return toShopReceiptVO(shopReceipt)
  }

  /**
   * 创建店铺收款
   */
  async createShopReceipt(data: ShopReceiptCreateRequest, createdBy?: string) {
    const shopReceipt = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(shopReceipt)
  }

  /**
   * 通过 ID 获取店铺收款
   * @param id 店铺收款 ID
   * @returns 店铺收款
   */
  async getShopReceiptById(id: string) {
    const shopReceipt = await this.getById(id, { isDeleted: false })
    return this.toVO(shopReceipt)
  }

  /**
   * 更新店铺收款
   */
  async updateShopReceipt(id: string, data: ShopReceiptUpdateRequest, updatedBy?: string) {
    const shopReceipt = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(shopReceipt)
  }

  /**
   * 删除店铺收款
   * @param id 店铺收款 ID
   * @param updatedBy 更新者
   */
  async deleteShopReceipt(id: string, updatedBy?: string) {
    const shopReceipt = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(shopReceipt)
  }
}

export const shopReceiptService = new ShopReceiptService()
