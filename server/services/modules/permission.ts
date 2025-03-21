import type { Permission, Prisma } from '@prisma/client'
import type { PermissionCreateRequest, PermissionSearchRequest, PermissionUpdateRequest } from '~~/server/schema/modules/permission'
import { AbstractService } from '..'
import { toPermissionVO } from '../vo'

/**
 * 权限服务
 */
export class PermissionService extends AbstractService<Permission> {
  delegate = prisma.permission

  /**
   * 转换为 VO
   * @param permission 权限
   * @returns 权限 VO
   */
  toVO(permission?: Permission | null): PermissionVO | null {
    return toPermissionVO(permission)
  }

  /**
   * 创建权限
   */
  async createPermission(data: PermissionCreateRequest, createdBy?: string) {
    const permission = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(permission)
  }

  /**
   * 通过 ID 获取权限
   * @param id 权限 ID
   * @returns 权限
   */
  async getPermissionById(id: string) {
    const permission = await this.getById(id, { isDeleted: false })
    return this.toVO(permission)
  }

  /**
   * 更新权限
   */
  async updatePermission(id: string, data: PermissionUpdateRequest, updatedBy?: string) {
    const permission = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(permission)
  }

  /**
   * 删除权限
   * @param id 权限 ID
   * @param updatedBy 更新者
   */
  async deletePermission(id: string, updatedBy?: string) {
    const permission = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(permission)
  }

  /**
   * 搜索权限
   */
  async searchPermission(body: PermissionSearchRequest, pageParams: PageParamsType) {
    const { page, size } = pageParams
    const { name } = body
    const where: Prisma.PermissionWhereInput = {
      isDeleted: false,
      OR: [
        {
          name: {
            contains: name,
          },
        },
        {
          permKey: {
            contains: name,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const permissions = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: permissions.map(permission => this.toVO(permission)!),
      page,
      size,
    }
  }
}

export const permissionService = new PermissionService()
