import type { Prisma, User } from '@prisma/client'
import type { UserCreateRequest, UserRegisterRequest, UserSearchRequest, UserStatus, UserUpdateRequest } from '../../schema/modules/user'
import { AbstractService } from '..'
import { hashPassword, verifyPassword } from '../../lib/auth'
import { toPermissionVO, toUserVO } from '../vo'

export interface LoginCredentialsType {
  password: string
  username: string
}

/**
 * 用户服务
 */
export class UserService extends AbstractService<User> {
  delegate = prisma.user

  /**
   * 转换为 VO
   * @param user 用户
   * @returns 用户 VO
   */
  toVO(user?: User | null) {
    return toUserVO(user)
  }

  /**
   * 创建用户
   * @param data 用户信息
   * @returns 用户
   */
  async createUser(data: UserCreateRequest, createdBy?: string) {
    const { email, password, username } = data
    const user = await $transaction(async (ctx) => {
      const user = await ctx.user.findFirst({
        where: {
          username,
        },
      })
      if (user) {
        throw new Error('用户名已存在')
      }
      const hashedPassword = await hashPassword(password)
      const newUser = await ctx.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          createdBy,
        },
      })
      return newUser
    })
    return this.toVO(user)
  }

  /**
   * 通过 ID 查询用户信息
   * @param id 用户 ID
   * @returns 用户
   */
  async getUser(id: string) {
    const user = await this.delegate.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    })
    return this.toVO(user)
  }

  /**
   * 更新用户信息
   * @param id 用户 ID
   * @param data 用户信息
   * @param updatedBy 更新人
   * @returns 更新后的用户
   */
  async updateUser(id: string, data: UserUpdateRequest, updatedBy?: string) {
    const user = await this.delegate.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(user)
  }

  /**
   * 删除用户
   * @param id 用户 ID
   * @param updatedBy 更新人
   * @returns 删除后的用户
   */
  async deleteUser(id: string, updatedBy?: string) {
    const user = await this.delegate.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        updatedBy,
      },
    })
    return this.toVO(user)
  }

  /**
   * 通过 username 获取用户
   * @param username 用户名
   * @returns 用户
   */
  async getUserByUsername(username: string): Promise<UserVO | null> {
    const user = await this.delegate.findFirst({
      where: {
        username,
      },
    })
    return this.toVO(user)
  }

  /**
   * 登录，无需自行调用，由鉴权框架调取
   * @param data 登录凭证
   * @returns 用户
   */
  async login(data?: LoginCredentialsType): Promise<UserVO> {
    if (!data) {
      throw new Error('缺少登录凭证')
    }
    const { username, password } = data
    const user = await this.delegate.findUnique({
      where: {
        isDeleted: false,
        username,
      },
    })
    if (!user || user.status !== 'ACTIVE') {
      throw new Error('用户不存在或已被封禁')
    }
    const isPasswordCorrect = await verifyPassword(user.password, password)
    if (!isPasswordCorrect) {
      throw new Error('密码错误')
    }
    return this.toVO(user)!
  }

  /**
   * 注册
   * @param data 注册信息
   * @returns 用户
   */
  async registerUser(data: UserRegisterRequest) {
    return this.createUser(data)
  }

  /**
   * 获取用户的权限列表
   */
  async getUserPermissions(id: string): Promise<PermissionVO[]> {
    const user = await this.delegate.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      select: {
        roles: true,
      },
    })
    if (!user) {
      return []
    }
    // 查询所有角色对应的权限
    const roles = await prisma.role.findMany({
      where: {
        id: {
          in: user.roles,
        },
        isDeleted: false,
      },
      select: {
        permissions: true,
      },
    })
    // 提取所有权限 ID
    const permissionIds = Array.from(
      new Set(
        roles.flatMap(role => role.permissions),
      ),
    )
    // 查询权限详情
    const permissions = await prisma.permission.findMany({
      where: {
        id: {
          in: permissionIds,
        },
        isDeleted: false,
      },
      include: {
        menus: true,
      },
    })
    // 转换为 VO
    return permissions.map(
      permission => toPermissionVO(permission),
    ).filter(Boolean) as PermissionVO[]
  }

  /**
   * 更新用户角色
   */
  async updateUserRoles(id: string, roles: string[]) {
    const user = await this.delegate.update({
      where: {
        id,
      },
      data: {
        roles: {
          set: roles,
        },
      },
    })
    return this.toVO(user)
  }

  /**
   * 封禁用户
   */
  async blockUser(id: string, updatedBy?: string) {
    const user = await this.delegate.update({
      where: {
        id,
      },
      data: {
        status: 'INACTIVE',
        updatedBy,
      },
    })
    return this.toVO(user)
  }

  /**
   * 搜索用户
   */
  async searchUsers(data: UserSearchRequest, pageParams: PageParamsType): Promise<PageType<UserVO>> {
    const { page, size } = pageParams
    const { keyword, createdAtFrom, createdAtTo, status } = data
    const where: Prisma.UserWhereInput = {
      isDeleted: false,
      createdAt: {
        gte: createdAtFrom,
        lte: createdAtTo,
      },
      status,
      OR: [
        {
          username: {
            contains: keyword,
          },
        },
        {
          phone: {
            contains: keyword,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const users = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: users.map(user => this.toVO(user)!),
      page,
      size,
    }
  }

  /**
   * 更新用户状态
   */
  async updateUserStatus(id: string, data: UserStatus) {
    const user = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(user)
  }
}

export const userService = new UserService()
