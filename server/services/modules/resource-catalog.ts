import type { ResourceCatalog } from '@prisma/client'
import type { ResourceCatalogCreateRequest, ResourceCatalogUpdateRequest } from '~~/server/schema/modules/resource-catalog'
import { AbstractService } from '..'
import { toResourceCatalogVO } from '../vo'

/**
 * 资源目录服务
 */
export class ResourceCatalogService extends AbstractService<ResourceCatalog> {
  delegate = prisma.resourceCatalog

  /**
   * 转换为 VO
   * @param resourceCatalog 资源目录
   * @returns 资源目录 VO
   */
  toVO(resourceCatalog?: ResourceCatalog | null): ResourceCatalogVO | null {
    return toResourceCatalogVO(resourceCatalog)
  }

  /**
   * 创建资源目录
   */
  async createResourceCatalog(data: ResourceCatalogCreateRequest, createdBy?: string) {
    const resourceCatalog = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(resourceCatalog)
  }

  /**
   * 通过 ID 获取资源目录
   * @param id 资源目录 ID
   * @returns 资源目录信息
   */
  async getResourceCatalogById(id: string) {
    const resourceCatalog = await this.getById(id, { isDeleted: false })
    return this.toVO(resourceCatalog)
  }

  /**
   * 更新资源目录信息
   */
  async updateResourceCatalog(id: string, data: ResourceCatalogUpdateRequest, updatedBy?: string) {
    const resourceCatalog = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(resourceCatalog)
  }

  /**
   * 删除资源目录
   * @param id 资源目录 ID
   * @param updatedBy 更新者
   */
  async deleteResourceCatalog(id: string, updatedBy?: string) {
    const resourceCatalog = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(resourceCatalog)
  }
}

export const resourceCatalogService = new ResourceCatalogService()
