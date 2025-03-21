import type { Prisma, ProductTag } from '@prisma/client'
import type { ProductTagCreateRequest, ProductTagSearchRequest, ProductTagUpdateRequest } from '~~/server/schema/modules/product-tag'
import { AbstractService } from '..'
import { toProductTagVO } from '../vo'

/**
 * 商品标签服务
 */
export class ProductTagService extends AbstractService<ProductTag> {
  delegate = prisma.productTag

  /**
   * 转换为 VO
   * @param productTag 商品标签
   * @returns 商品标签 VO
   */
  toVO(productTag?: ProductTag | null): ProductTagVO | null {
    return toProductTagVO(productTag)
  }

  /**
   * 创建商品标签
   */
  async createProductTag(data: ProductTagCreateRequest, createdBy?: string) {
    const productTag = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(productTag)
  }

  /**
   * 通过 ID 获取商品标签
   * @param id 商品标签 ID
   * @returns 商品标签
   */
  async getProductTagById(id: string) {
    const productTag = await this.getById(id, { isDeleted: false })
    return this.toVO(productTag)
  }

  /**
   * 更新商品标签
   */
  async updateProductTag(id: string, data: ProductTagUpdateRequest, updatedBy?: string) {
    const productTag = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(productTag)
  }

  /**
   * 删除商品标签
   * @param id 商品标签 ID
   * @param updatedBy 更新者
   */
  async deleteProductTag(id: string, updatedBy?: string) {
    const productTag = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(productTag)
  }

  /**
   * 搜索商品标签
   * @param data 搜索条件
   * @param pageParams 分页参数
   * @returns 商品标签分页
   */
  async searchProductTags(data: ProductTagSearchRequest, pageParams: PageParamsType): Promise<PageType<ProductTagVO>> {
    const { page, size } = pageParams
    const { keyword } = data
    const where: Prisma.ProductTagWhereInput = {
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
    const productTags = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: productTags.map(productTag => this.toVO(productTag)!),
      page,
      size,
    }
  }

  /**
   * 获取商品标签列表
   */
  async getProductTags() {
    const productTags = await this.delegate.findMany({
      where: { isDeleted: false },
    })
    return productTags.map(productTag => this.toVO(productTag)!)
  }
}

export const productTagService = new ProductTagService()
