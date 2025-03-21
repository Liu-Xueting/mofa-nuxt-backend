import type { ShopCoupon } from '@prisma/client'
import { AbstractService } from '..'
import { toShopCouponVO } from '../vo'

/**
 * 店铺优惠券服务
 */
export class ShopCouponService extends AbstractService<ShopCoupon> {
  delegate = prisma.shopCoupon

  /**
   * 转换为 VO
   * @param shopCoupon 店铺优惠券
   * @returns 店铺 VO
   */
  toVO(shopCoupon?: ShopCoupon | null): ShopCouponVO | null {
    return toShopCouponVO(shopCoupon)
  }

  /**
   * 创建店铺优惠券
   */
  async createShopCoupon(data: ShopCouponCreateRequest, createdBy?: string) {
    const shopCoupon = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(shopCoupon)
  }

  /**
   * 通过 ID 获取店铺优惠券
   * @param id 店铺优惠券 ID
   * @returns 店铺优惠券
   */
  async getShopCouponById(id: string) {
    const shopCoupon = await this.getById(id, { isDeleted: false })
    return this.toVO(shopCoupon)
  }

  /**
   * 更新店铺优惠券
   */
  async updateShopCoupon(id: string, data: ShopCouponUpdateRequest, updatedBy?: string) {
    const shopCoupon = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(shopCoupon)
  }

  /**
   * 删除店铺优惠券
   * @param id 店铺优惠券 ID
   * @param updatedBy 更新者
   */
  async deleteShopCoupon(id: string, updatedBy?: string) {
    const shopCoupon = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(shopCoupon)
  }
}

export const shopCouponService = new ShopCouponService()
