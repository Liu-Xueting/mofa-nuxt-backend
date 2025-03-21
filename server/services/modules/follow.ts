import type { Follow } from '@prisma/client'
import type { FollowCreateRequest } from '~~/server/schema/modules/follow'
import { AbstractService } from '..'
import { toFollowVO } from '../vo'

/**
 * 关注服务
 */
export class FollowService extends AbstractService<Follow> {
  delegate = prisma.follow

  /**
   * 转换为 VO
   */
  toVO(follow?: Follow | null): FollowVO | null {
    return toFollowVO(follow)
  }

  /**
   * 创建关注
   */
  async createFollow(data: FollowCreateRequest) {
    const follow = await this.delegate.create({ data })
    return this.toVO(follow)
  }

  /**
   * 通过 ID 获取关注
   */
  async getFollowById(id: string) {
    const follow = await this.getById(id, { isDeleted: false })
    return this.toVO(follow)
  }

  /**
   * 更新关注
   */
  async updateFollow(id: string, data: FollowCreateRequest) {
    const follow = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(follow)
  }

  /**
   * 删除关注
   */
  async deleteFollow(id: string) {
    const follow = await this.delegate.update({
      where: { id },
      data: { isDeleted: true },
    })
    return this.toVO(follow)
  }
}

export const followService = new FollowService()
