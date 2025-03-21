import type { Prisma, ShopApply } from '@prisma/client'
import type { ShopApplyCreateRequest, ShopApplySearchRequest, ShopApplyStatusRequest, ShopApplyUpdateRequest } from '../../schema/modules/shop-apply'
import { AbstractService } from '..'
import { toShopApplyVO } from '../vo'

/**
 * 店铺申请服务
 */
export class ShopApplyService extends AbstractService<ShopApply> {
  delegate = prisma.shopApply

  /**
   * 转换为 VO
   * @param shopApply 店铺申请
   * @returns 店铺申请 VO
   */
  toVO(shopApply?: ShopApply | null): ShopApplyVO | null {
    return toShopApplyVO(shopApply)
  }

  /**
   * 创建店铺申请
   * @param userId 用户 ID
   * @param data 创建店铺申请
   * @param createdBy 创建者
   * @returns 店铺申请 VO
   */
  async createShopApply(userId: string, data: ShopApplyCreateRequest, createdBy?: string) {
    const shopApply = await this.delegate.create({
      data: {
        userId,
        ...data,
        createdBy,
      },
    })
    return this.toVO(shopApply)
  }

  /**
   * 通过 ID 获取店铺申请
   * @param id 店铺申请 ID
   * @returns 店铺申请信息
   */
  async getShopApply(id: string) {
    const shopApply = await this.getById(id, { isDeleted: false })
    return this.toVO(shopApply)
  }

  /**
   * 更新店铺申请信息
   */
  async updateShopApply(id: string, data: ShopApplyUpdateRequest, updatedBy?: string) {
    const shopApply = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(shopApply)
  }

  /**
   * 删除店铺申请
   * @param id 店铺申请 ID
   * @param updatedBy 更新者
   */
  async deleteShopApply(id: string, updatedBy?: string) {
    const shopApply = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(shopApply)
  }

  /**
   * 搜索店铺申请
   */
  async searchShopApplies(data: ShopApplySearchRequest, pageParams: PageParamsType): Promise<PageType<ShopApplyVO>> {
    const { page, size } = pageParams
    const { keyword, createdAtFrom, createdAtTo, status } = data
    const where: Prisma.ShopApplyWhereInput = {
      isDeleted: false,
      createdAt: {
        gte: createdAtFrom,
        lte: createdAtTo,
      },
      status,
      OR: [
        {
          realName: {
            contains: keyword,
          },
        },
        {
          shopName: {
            contains: keyword,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const shopApplies = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: shopApplies.map(shopApply => this.toVO(shopApply)!),
      page,
      size,
    }
  }

  /**
   * 修改店铺申请状态
   */
  async updateShopApplyStatus(id: string, data: ShopApplyStatusRequest) {
    const shopApply = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(shopApply)
  }
}

export const shopApplyService = new ShopApplyService()
