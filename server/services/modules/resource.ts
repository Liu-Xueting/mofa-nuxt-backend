import type { Resource } from '@prisma/client'
import type { ResourceCreateRequest, ResourceUpdateRequest } from '~~/server/schema/modules/resource'
import { AbstractService } from '..'
import { toResourceVO } from '../vo'

/**
 * 资源服务
 */
export class ResourceService extends AbstractService<Resource> {
  delegate = prisma.resource

  /**
   * 转换为 VO
   * @param resource 资源
   * @returns 资源 VO
   */
  toVO(resource?: Resource | null): ResourceVO | null {
    return toResourceVO(resource)
  }

  /**
   * 创建资源
   */
  async createResource(data: ResourceCreateRequest, createdBy?: string) {
    const resource = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(resource)
  }

  /**
   * 通过 ID 获取资源
   * @param id 资源 ID
   * @returns 资源信息
   */
  async getResourceById(id: string) {
    const resource = await this.getById(id, { isDeleted: false })
    return this.toVO(resource)
  }

  /**
   * 更新资源信息
   */
  async updateResource(id: string, data: ResourceUpdateRequest, updatedBy?: string) {
    const resource = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(resource)
  }

  /**
   * 删除资源
   * @param id 资源 ID
   * @param updatedBy 更新者
   */
  async deleteResource(id: string, updatedBy?: string) {
    const resource = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(resource)
  }
}

export const resourceService = new ResourceService()
