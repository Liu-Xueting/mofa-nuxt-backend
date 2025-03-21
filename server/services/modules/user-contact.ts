import type { UserContact } from '@prisma/client'
import { AbstractService } from '..'
import { toUserContactVO } from '../vo'

/**
 * 用户联系服务
 */
export class UserContactService extends AbstractService<UserContact> {
  delegate = prisma.userContact

  /**
   * 转换为 VO
   * @param userContact 用户联系
   * @returns User
   */
  toVO(userContact?: UserContact | null): UserContactVO | null {
    return toUserContactVO(userContact)
  }

  /**
   * 创建用户联系
   */
  async createUserContact(data: UserContactCreateRequest) {
    const userContact = await this.delegate.create({ data })
    return this.toVO(userContact)
  }

  /**
   * 通过 ID 获取用户联系
   * @param id 用户联系 ID
   * @returns 用户联系
   */
  async getUserContactById(id: string) {
    const userContact = await this.getById(id, { isDeleted: false })
    return this.toVO(userContact)
  }

  /**
   * 更新用户联系
   */
  async updateUserContact(id: string, data: UserContactUpdateRequest) {
    const userContact = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(userContact)
  }

  /**
   * 删除用户联系
   */
  async deleteUserContact(id: string) {
    const userContact = await this.delegate.update({
      where: { id },
      data: { isDeleted: true },
    })
    return this.toVO(userContact)
  }
}

export const userContactService = new UserContactService()
