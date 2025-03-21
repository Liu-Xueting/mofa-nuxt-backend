import type { ShopTag } from '@prisma/client'
import { AbstractService } from '..'
import { toShopTagVO } from '../vo'

/**
 * 店铺标签服务
 */
export class ShopTagService extends AbstractService<ShopTag> {
  delegate = prisma.shopTag

  /**
   * 转换为 VO
   * @param shopTag 店铺标签
   * @returns 店铺 VO
   */
  toVO(shopTag?: ShopTag | null): ShopTagVO | null {
    return toShopTagVO(shopTag)
  }

  /**
   * 创建店铺标签
   */
  async createShopTag(data: ShopTagCreateRequest, createdBy?: string) {
    const shopTag = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(shopTag)
  }

  /**
   * 通过 ID 获取店铺标签
   * @param id 店铺标签 ID
   * @returns 店铺标签信息
   */
  async getShopTag(id: string) {
    const shopTag = await this.getById(id, { isDeleted: false })
    return this.toVO(shopTag)
  }

  /**
   * 更新店铺标签信息
   */
  async updateShopTag(id: string, data: ShopTagUpdateRequest, updatedBy?: string) {
    const shopTag = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(shopTag)
  }

  /**
   * 删除店铺标签
   * @param id 店铺标签 ID
   * @param updatedBy 更新者
   */
  async deleteShopTag(id: string, updatedBy?: string) {
    const shopTag = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(shopTag)
  }
}

export const shopTagService = new ShopTagService()
