import type { Prisma, Shop } from '@prisma/client'
import type { ShopCreateRequest, ShopSearchRequest, ShopUpdateRequest } from '~~/server/schema/modules/shop'
import { AbstractService } from '..'
import { toShopVO } from '../vo'

/**
 * 店铺服务
 */
export class ShopService extends AbstractService<Shop> {
  delegate = prisma.shop

  /**
   * 转换为 VO
   * @param shop 店铺
   * @returns 店铺 VO
   */
  toVO(shop?: Shop | null): ShopVO | null {
    return toShopVO(shop)
  }

  /**
   * 创建店铺
   */
  async createShop(userId: string, data: ShopCreateRequest, createdBy?: string) {
    const shop = await this.delegate.create({
      data: {
        userId,
        ...data,
        createdBy,
      },
    })
    return this.toVO(shop)
  }

  /**
   * 通过 ID 获取店铺
   * @param id 店铺 ID
   * @returns 店铺信息
   */
  async getShopById(id: string) {
    const shop = await this.getById(id, { isDeleted: false })
    return this.toVO(shop)
  }

  /**
   * 更新店铺信息
   */
  async updateShop(id: string, data: ShopUpdateRequest, updatedBy?: string) {
    const shop = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(shop)
  }

  /**
   * 删除店铺
   * @param id 店铺 ID
   * @param updatedBy 更新者
   */
  async deleteShop(id: string, updatedBy?: string) {
    const shop = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(shop)
  }

  /**
   * 搜索店铺
   */
  async searchShops(data: ShopSearchRequest, pageParams: PageParamsType) {
    const { page, size } = pageParams
    const { keyword, createdAtFrom, createdAtTo, status } = data
    const where: Prisma.ShopWhereInput = {
      isDeleted: false,
      createdAt: {
        gte: createdAtFrom,
        lte: createdAtTo,
      },
      status,
      OR: [
        {
          name: {
            contains: keyword,
          },
        },
        {
          description: {
            contains: keyword,
          },
        },
        {
          province: {
            contains: keyword,
          },
        },
        {
          city: {
            contains: keyword,
          },
        },
        {
          district: {
            contains: keyword,
          },
        },
        {
          street: {
            contains: keyword,
          },
        },
        {
          address: {
            contains: keyword,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const shops = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: shops.map(shop => this.toVO(shop)!),
      page,
      size,
    }
  }

  /**
   * 获取店铺列表
   */
  async getShops() {
    const shops = await this.delegate.findMany({
      where: { isDeleted: false },
    })
    return shops.map(shop => this.toVO(shop)!)
  }
}

export const shopService = new ShopService()
