import type { FavoriteItem } from '@prisma/client'
import { AbstractService } from '..'
import { toFavoriteItemVO } from '../vo'

/**
 * 收藏项服务
 */
export class FavoriteItemService extends AbstractService<FavoriteItem> {
  delegate = prisma.favoriteItem

  /**
   * 转换为 VO
   * @param favoriteItem 收藏项
   * @returns 收藏项 VO
   */
  toVO(favoriteItem?: FavoriteItem | null): FavoriteItemVO | null {
    return toFavoriteItemVO(favoriteItem)
  }

  /**
   * 创建收藏项
   */
  async createFavoriteItem(data: FavoriteItemCreateRequest, createdBy?: string) {
    const favoriteItem = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(favoriteItem)
  }

  /**
   * 通过 ID 获取收藏项
   * @param id 收藏项 ID
   * @returns 收藏项
   */
  async getFavoriteItemById(id: string) {
    const favoriteItem = await this.getById(id, { isDeleted: false })
    return this.toVO(favoriteItem)
  }

  /**
   * 更新收藏项
   */
  async updateFavoriteItem(id: string, data: FavoriteItemUpdateRequest, updatedBy?: string) {
    const favoriteItem = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(favoriteItem)
  }

  /**
   * 删除收藏项
   * @param id 收藏项 ID
   * @param updatedBy 更新者
   */
  async deleteFavoriteItem(id: string, updatedBy?: string) {
    const favoriteItem = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(favoriteItem)
  }
}

export const favoriteItemService = new FavoriteItemService()
