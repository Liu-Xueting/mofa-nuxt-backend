import type { Prisma, ProductGroup } from '@prisma/client'
import type { ProductGroupVO } from '~~/types/vo'
import type { ProductGroupCreateRequest, ProductGroupSearchRequest, ProductGroupUpdateRequest } from '../../schema/modules/product-group'
import { AbstractService } from '..'
import { toProductGroupVO } from '../vo'

/**
 * 商品分组服务
 */
export class ProductGroupService extends AbstractService<ProductGroup> {
  delegate = prisma.productGroup

  /**
   * 转换为 VO
   * @param productGroup 商品分组
   * @returns 商品分组 VO
   */
  toVO(productGroup?: ProductGroup | null): ProductGroupVO | null {
    return toProductGroupVO(productGroup)
  }

  /**
   * 创建产品组
   * @param data 创建产品组数据
   * @param createdBy 创建者
   */
  async createProductGroup(data: ProductGroupCreateRequest, createdBy?: string) {
    const productGroup = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(productGroup)
  }

  /**
   * 获取产品组信息
   * @param id 产品组 ID
   * @returns 产品组
   */
  async getProductGroupById(id: string): Promise<ProductGroupVO | null> {
    const productGroup = await this.getById(id, { isDeleted: false })
    return this.toVO(productGroup)
  }

  /**
   * 更新产品组
   * @param id 产品组 ID
   * @param data 更新产品组数据
   * @param updatedBy 更新者
   */
  async updateProductGroup(id: string, data: ProductGroupUpdateRequest, updatedBy?: string) {
    const productGroup = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(productGroup)
  }

  /**
   * 删除商品分组
   * @param id 商品分组 ID
   * @param updatedBy 更新者
   */
  async deleteProductGroup(id: string, updatedBy?: string) {
    const productGroup = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(productGroup)
  }

  /**
   * 搜索商品分组
   * @param data 搜索条件
   * @param pageParams 分页参数
   * @returns 商品分页
   */
  async searchProductGroups(data: ProductGroupSearchRequest, pageParams: PageParamsType) {
    const { page, size } = pageParams
    const { keyword } = data
    const where: Prisma.ProductGroupWhereInput = {
      isDeleted: false,
      OR: [
        {
          name: {
            contains: keyword,
          },
        },
        {
          description: {
            contains: keyword,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const productGroups = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: productGroups.map(productGroup => this.toVO(productGroup)!),
      page,
      size,
    }
  }

  /**
   * 获取商品分组列表
   */
  async getProductGroups() {
    const productGroups = await this.delegate.findMany({
      where: { isDeleted: false },
    })
    return productGroups.map(productGroup => this.toVO(productGroup)!)
  }
}

export const productGroupService = new ProductGroupService()
