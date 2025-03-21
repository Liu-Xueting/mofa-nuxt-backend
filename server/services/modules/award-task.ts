import type { AwardTask } from '@prisma/client'
import type { AwardTaskCreateRequest, AwardTaskUpdateRequest } from '~~/server/schema/modules/award-task'
import { AbstractService } from '..'
import { toAwardTaskVO } from '../vo'

/**
 * 发包任务服务
 */
export class AwardTaskService extends AbstractService<AwardTask> {
  delegate = prisma.awardTask

  /**
   * 转换为 VO
   * @param awardTask 发包任务
   * @returns 发包任务 VO
   */
  toVO(awardTask?: AwardTask | null): AwardTaskVO | null {
    return toAwardTaskVO(awardTask)
  }

  /**
   * 创建发包任务
   */
  async createAwardTask(data: AwardTaskCreateRequest, createdBy?: string) {
    const awardTask = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(awardTask)
  }

  /**
   * 通过 ID 获取发包任务
   * @param id 发包任务 ID
   * @returns 发包任务
   */
  async getAwardTaskById(id: string) {
    const awardTask = await this.getById(id, { isDeleted: false })
    return this.toVO(awardTask)
  }

  /**
   * 更新发包任务
   */
  async updateAwardTask(id: string, data: AwardTaskUpdateRequest, updatedBy?: string) {
    const awardTask = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(awardTask)
  }

  /**
   * 删除发包任务
   * @param id 发包任务 ID
   * @param updatedBy 更新者
   */
  async deleteAwardTask(id: string, updatedBy?: string) {
    const awardTask = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(awardTask)
  }
}

export const awardTaskService = new AwardTaskService()
