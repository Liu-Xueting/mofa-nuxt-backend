import type { Hunter } from '@prisma/client'
import type { HunterCreateRequest, HunterUpdateRequest } from '~~/server/schema/modules/hunter'
import { AbstractService } from '..'
import { toHunterVO } from '../vo'

/**
 * 枪手服务
 */
export class HunterService extends AbstractService<Hunter> {
  delegate = prisma.hunter

  /**
   * 转换为 VO
   * @param hunter 枪手
   * @returns 枪手 VO
   */
  toVO(hunter?: Hunter | null): HunterVO | null {
    return toHunterVO(hunter)
  }

  /**
   * 创建枪手
   */
  async createHunter(data: HunterCreateRequest, createdBy?: string) {
    const hunter = await this.delegate.create({ data: { ...data, createdBy } })
    return this.toVO(hunter)
  }

  /**
   * 通过 ID 获取枪手
   * @param id 枪手 ID
   * @returns 枪手
   */
  async getHunterById(id: string) {
    const hunter = await this.getById(id, { isDeleted: false })
    return this.toVO(hunter)
  }

  /**
   * 更新枪手
   */
  async updateHunter(id: string, data: HunterUpdateRequest, updatedBy?: string) {
    const hunter = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(hunter)
  }

  /**
   * 删除枪手
   * @param id 枪手 ID
   * @param updatedBy 更新者
   */
  async deleteHunter(id: string, updatedBy?: string) {
    const hunter = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(hunter)
  }
}

export const hunterService = new HunterService()
