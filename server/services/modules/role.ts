import type { Prisma, Role } from '@prisma/client'
import type { RoleVO } from '~~/types/vo'
import type { RoleCreateRequest, RoleSearchRequest, RoleUpdateRequest } from '../../schema/modules/role'
import { AbstractService } from '..'
import { toRoleVO } from '../vo'

/**
 * 角色服务
 */
export class RoleService extends AbstractService<Role> {
  delegate = prisma.role

  /**
   * 转换为 VO
   * @param role 角色
   * @returns 角色 VO
   */
  toVO(role?: Role | null): RoleVO | null {
    return toRoleVO(role)
  }

  /**
   * 创建角色
   * @param data 创建角色数据
   * @param createdBy 创建者
   */
  async createRole(data: RoleCreateRequest, createdBy?: string) {
    const role = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(role)
  }

  /**
   * 获取角色信息
   * @param id 角色 ID
   * @returns 角色
   */
  async getRole(id: string): Promise<RoleVO | null> {
    const role = await this.getById(id, { isDeleted: false })
    return this.toVO(role)
  }

  /**
   * 更新角色
   * @param id 角色 ID
   * @param data 更新角色数据
   * @param updatedBy 更新者
   */
  async updateRole(id: string, data: RoleUpdateRequest, updatedBy?: string) {
    const role = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(role)
  }

  /**
   * 删除角色
   * @param id 角色 ID
   * @param updatedBy 更新者
   */
  async deleteRole(id: string, updatedBy?: string) {
    const role = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(role)
  }

  /**
   * 搜索角色
   */
  async searchRole(body: RoleSearchRequest, pageParams: PageParamsType) {
    const { page, size } = pageParams
    const { keyWord } = body
    const where: Prisma.RoleWhereInput = {
      isDeleted: false,
      OR: [
        {
          name: {
            contains: keyWord,
          },
        },
        {
          description: {
            contains: keyWord,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const roles = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: roles.map(role => this.toVO(role)!),
      page,
      size,
    }
  }
}

export const roleService = new RoleService()
