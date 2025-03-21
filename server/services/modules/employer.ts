import type { Employer } from '@prisma/client'
import type { EmployerCreateRequest, EmployerUpdateRequest } from '~~/server/schema/modules/employer'
import { AbstractService } from '..'
import { toEmployerVO } from '../vo'

/**
 * 发包方服务
 */
export class EmployerService extends AbstractService<Employer> {
  delegate = prisma.employer

  /**
   * 转换为 VO
   * @param employer 发包方
   * @returns 发包方 VO
   */
  toVO(employer?: Employer | null): EmployerVO | null {
    return toEmployerVO(employer)
  }

  /**
   * 创建发包方
   */
  async createEmployer(data: EmployerCreateRequest, createdBy?: string) {
    const employer = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(employer)
  }

  /**
   * 通过 ID 获取发包方
   * @param id 发包方 ID
   * @returns 发包方
   */
  async getEmployerById(id: string) {
    const employer = await this.getById(id, { isDeleted: false })
    return this.toVO(employer)
  }

  /**
   * 更新发包方
   */
  async updateEmployer(id: string, data: EmployerUpdateRequest, updatedBy?: string) {
    const employer = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(employer)
  }

  /**
   * 删除发包方
   * @param id 发包方 ID
   * @param updatedBy 更新者
   */
  async deleteEmployer(id: string, updatedBy?: string) {
    const employer = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(employer)
  }
}

export const employerService = new EmployerService()
