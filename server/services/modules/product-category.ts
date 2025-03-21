import type { Prisma, ProductCategory } from '@prisma/client'
import type { ProductCategoryVO } from '~~/types/vo'
import type { ProductCategoryCreateRequest, ProductCategorySearchRequest, ProductCategoryUpdateRequest } from '../../schema/modules/product-category'
import { AbstractService } from '..'
import { toProductCategoryVO } from '../vo'

/**
 * 商品分类服务
 */
export class ProductCategoryService extends AbstractService<ProductCategory> {
  delegate = prisma.productCategory

  /**
   * 转换为 VO
   * @param productCategory 商品分类
   * @returns 商品分类 VO
   */
  toVO(productCategory?: ProductCategory | null): ProductCategoryVO | null {
    return toProductCategoryVO(productCategory)
  }

  /**
   * 创建产品分类
   * @param data 创建产品分类数据
   * @param createdBy 创建者
   */
  async createProductCategory(data: ProductCategoryCreateRequest, createdBy?: string) {
    const productCategory = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(productCategory)
  }

  /**
   * 通过 ID 获取商品分类
   * @param id 商品分类 ID
   * @returns 商品分类
   */
  async getProductCategoryById(id: string) {
    const productCategory = await this.getById(id, { isDeleted: false })
    return this.toVO(productCategory)
  }

  /**
   * 更新产品分类
   * @param id 产品分类 ID
   * @param data 更新产品分类数据
   * @param updatedBy 更新者
   */
  async updateProductCategory(id: string, data: ProductCategoryUpdateRequest, updatedBy?: string) {
    const productCategory = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(productCategory)
  }

  /**
   * 删除商品分类
   * @param id 商品分类 ID
   * @param updatedBy 更新者
   */
  async deleteProductCategory(id: string, updatedBy?: string) {
    const productCategory = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(productCategory)
  }

  /**
   * 搜索商品分类
   * @param data 搜索商品分类数据
   * @param pageParams 分页参数
   * @returns 商品分类分页
   */
  async searchProductCategories(data: ProductCategorySearchRequest, pageParams: PageParamsType): Promise<PageType<ProductCategory>> {
    const { page, size } = pageParams
    const { keyword, createdAtFrom, createdAtTo, isDeleted } = data
    const where: Prisma.ProductCategoryWhereInput = {
      createdAt: {
        gte: createdAtFrom,
        lte: createdAtTo,
      },
      isDeleted,
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
    const productCategories = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: productCategories,
      page,
      size,
    }
  }

  /**
   * 获取商品分类列表
   * @returns 商品分类列表
   */
  async getProductCategories() {
    const productCategories = await this.delegate.findMany({
      where: { isDeleted: false },
    })
    return productCategories.map(productCategory => this.toVO(productCategory)!)
  }
}

export const productCategoryService = new ProductCategoryService()
