import type { Menu, Prisma } from '@prisma/client'
import type { MenuCreateRequest, MenuSearchRequest, MenuUpdateRequest } from '~~/server/schema/modules/menu'
import { AbstractService } from '..'
import { toMenuVO } from '../vo'

/**
 * 菜单服务
 */
export class MenuService extends AbstractService<Menu> {
  delegate = prisma.menu

  /**
   * 转换为 VO
   * @param menu 菜单
   * @returns 菜单 VO
   */
  toVO(menu?: Menu | null): MenuVO | null {
    return toMenuVO(menu)
  }

  /**
   * 创建菜单
   */
  async createMenu(data: MenuCreateRequest, createdBy?: string) {
    const menu = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(menu)
  }

  /**
   * 通过 ID 获取菜单
   * @param id 菜单 ID
   * @returns 菜单
   */
  async getMenuById(id: string) {
    const menu = await this.getById(id, { isDeleted: false })
    return this.toVO(menu)
  }

  /**
   * 更新菜单
   */
  async updateMenu(id: string, data: MenuUpdateRequest, updatedBy?: string) {
    const menu = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(menu)
  }

  /**
   * 删除菜单
   * @param id 菜单 ID
   * @param updatedBy 更新者
   */
  async deleteMenu(id: string, updatedBy?: string) {
    const menu = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(menu)
  }

  /**
   * 搜索菜单
   */
  async searchMenu(body: MenuSearchRequest, pageParams: PageParamsType) {
    const { page, size } = pageParams
    const { keyWord, type } = body
    const where: Prisma.MenuWhereInput = {
      isDeleted: false,
      type: type ?? undefined,
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

export const menuService = new MenuService()
