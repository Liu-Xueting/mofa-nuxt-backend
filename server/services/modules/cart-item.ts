import type { CartItem } from '@prisma/client'
import type { CartItemCreateRequest, CartItemUpdateRequest } from '~~/server/schema/modules/cart-item'
import { AbstractService } from '..'
import { toCartItemVO } from '../vo'

/**
 * 购物车服务
 */
export class CartItemService extends AbstractService<CartItem> {
  delegate = prisma.cartItem

  /**
   * 转换为 VO
   * @param cartItem 购物车项目
   * @returns 购物车项目 VO
   */
  toVO(cartItem?: CartItem | null): CartItemVO | null {
    return toCartItemVO(cartItem)
  }

  /**
   * 创建购物车项目
   */
  async createCartItem(data: CartItemCreateRequest, createdBy?: string) {
    const cartItem = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(cartItem)
  }

  /**
   * 通过 ID 获取购物车项目
   * @param id 购物车项目 ID
   * @returns 购物车项目
   */
  async getCartItemById(id: string) {
    const cartItem = await this.getById(id, { isDeleted: false })
    return this.toVO(cartItem)
  }

  /**
   * 更新购物车项目
   */
  async updateCartItem(id: string, data: CartItemUpdateRequest, updatedBy?: string) {
    const cartItem = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(cartItem)
  }

  /**
   * 删除购物车项目
   * @param id 购物车项目 ID
   * @param updatedBy 更新者
   */
  async deleteCartItem(id: string, updatedBy: string) {
    const cartItem = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(cartItem)
  }
}

export const cartItemService = new CartItemService()
