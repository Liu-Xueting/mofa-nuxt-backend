/**
 * 查询方法委托
 */
export interface Delegate {
  aggregate: (data: any) => any
  count: (data?: any) => any
  create: (data: any) => any
  delete: (data: any) => any
  deleteMany: (data: any) => any
  findFirst: (data: any) => any
  findMany: (data: any) => any
  findUnique: (data: any) => any
  update: (data: any) => any
  updateMany: (data: any) => any
  upsert: (data: any) => any
}

export interface BaseModel {
  id: string
}

/**
 * 抽象服务
 */
export abstract class AbstractService<T extends BaseModel> {
  /**
   * 返回 VO 对象
   * @param data 数据
   * @returns VO 对象
   */
  toVO(data?: T | null): Partial<T> | null {
    return data ?? null
  }

  /**
   * 返回 VO 对象列表
   * @param data 数据列表
   * @returns VO 对象列表
   */
  toVOList(data: T[]): Partial<T>[] {
    return data.map(item => this.toVO(item)!)
  }

  /**
   * 返回 VO 对象分页
   * @param data 数据分页
   * @returns VO 对象分页
   */
  toVOPage(data: PageType<T>): PageType<Partial<T>> {
    return {
      ...data,
      list: this.toVOList(data.list),
    }
  }

  /**
   * 计数
   * @returns 数字
   */
  async count(): Promise<number> {
    return await this.delegate.count()
  }

  /**
   * 创建对象
   * @param data 对象数据
   * @returns 创建结果
   */
  async create(data: Partial<T>): Promise<T> {
    return await this.delegate.create({
      data,
    })
  }

  /**
   * 通过 ID 删除
   * @param id 对象 ID
   */
  async hardDeleteById<T>(id: string): Promise<T | null> {
    return await this.delegate.delete({
      where: {
        id,
      },
    })
  }

  /**
   * 查询全部
   */
  async getAll(filters?: Partial<T>): Promise<T[]> {
    return await this.delegate.findMany({
      where: {
        ...filters,
      },
    })
  }

  /**
   * 通过 ID 查询
   * @param id 对象 ID
   * @returns 查询结果
   */
  async getById(id: string, filters?: Partial<T>): Promise<T | null> {
    return await this.delegate.findUnique({
      where: {
        id,
        ...filters,
      },
    })
  }

  /**
   * 分页查询列表
   * @param page 分页参数
   * @returns 分页查询结果
   */
  async getByPage(page: PageParamsType, filters?: Partial<T>): Promise<PageType<T>> {
    const { page: currentPage, size } = page
    const total = await this.delegate.count({
      where: {
        ...filters,
      },
    })
    const list = await this.delegate.findMany({
      skip: (currentPage - 1) * size,
      take: size,
      where: {
        ...filters,
      },
    })
    return {
      list,
      page: page.page,
      size: page.size,
      total,
    }
  }

  /**
   * 通过 ID 伪删除
   * @param id 对象 ID
   * @returns 删除结果
   */
  async deleteById(id: string): Promise<T | null> {
    return await this.delegate.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    })
  }

  /**
   * 通过 ID 更新
   * @param id 对象 ID
   * @param data 更新数据
   * @returns 更新结果
   */
  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    return await this.delegate.update({
      data,
      where: {
        id,
      },
    })
  }

  abstract delegate: Delegate
}
