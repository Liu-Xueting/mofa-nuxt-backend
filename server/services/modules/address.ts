import type { Address } from '@prisma/client'
import type { AddressCreateRequest, AddressUpdateRequest } from '~~/server/schema/modules/address'
import type { AddressVO } from '~~/types/vo'
import { AbstractService } from '..'
import { toAddressVO } from '../vo'

/**
 * 地址服务
 */
export class AddressService extends AbstractService<Address> {
  delegate = prisma.address

  /**
   * 转换为 VO
   * @param address 地址
   * @returns 地址 VO
   */
  toVO(address?: Address | null): AddressVO | null {
    return toAddressVO(address)
  }

  /**
   * 创建地址
   * @param userId 用户 ID
   * @param data 创建地址数据
   */
  async createAddress(userId: string, data: AddressCreateRequest) {
    const address = await this.delegate.create({
      data: {
        userId,
        ...data,
      },
    })
    return this.toVO(address)
  }

  /**
   * 获取地址信息
   * @param id 地址 ID
   * @returns 地址
   */
  async getAddressById(id: string): Promise<AddressVO | null> {
    const address = await this.getById(id, { isDeleted: false })
    return this.toVO(address)
  }

  /**
   * 更新地址
   * @param id 地址 ID
   * @param data 更新地址数据
   */
  async updateAddress(id: string, data: AddressUpdateRequest) {
    const address = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(address)
  }

  /**
   * 删除地址
   * @param id 地址 ID
   */
  async deleteAddress(id: string) {
    const address = await this.delegate.update({
      where: { id },
      data: { isDeleted: true },
    })
    return this.toVO(address)
  }
}

export const addressService = new AddressService()
