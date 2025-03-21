import type { Prisma, Product } from '@prisma/client'
import type { ProductCreateRequest, ProductSearchRequest, ProductStatusRequest, ProductUpdateRequest } from '../../schema/modules/product'
import { AbstractService } from '..'
import { toProductVO } from '../vo'
/**
 * 商品服务
 */
export class ProductService extends AbstractService<Product> {
  delegate = prisma.product

  /**
   * 转换为 VO
   * @param product 商品
   * @returns 商品 VO
   */
  toVO(product?: Product | null): ProductVO | null {
    return toProductVO(product)
  }

  /**
   * 创建商品
   */
  async createProduct(data: ProductCreateRequest, createdBy?: string) {
    const product = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(product)
  }

  /**
   * 通过 ID 获取商品
   * @param id 商品 ID
   * @returns 商品
   */
  async getProductById(id: string) {
    const product = await this.getById(id, { isDeleted: false })
    return this.toVO(product)
  }

  /**
   * 更新商品
   */
  async updateProduct(id: string, data: ProductUpdateRequest, updatedBy?: string) {
    const product = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(product)
  }

  /**
   * 删除商品
   * @param id 商品 ID
   * @param updatedBy 更新者
   */
  async deleteProduct(id: string, updatedBy?: string) {
    const product = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(product)
  }

  /**
   * 搜索商品
   * @param data 搜索条件
   * @param pageParams 分页参数
   * @returns 商品分页
   */
  async searchProducts(data: ProductSearchRequest, pageParams: PageParamsType): Promise<PageType<ProductTagVO>> {
    const { page, size } = pageParams
    const { keyword, status, minPrice, maxPrice, category } = data
    const where: Prisma.ProductWhereInput = {
      isDeleted: false,
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      status,
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
        {
          categories: {
            has: category,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const products = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: products.map(product => this.toVO(product)!),
      page,
      size,
    }
  }

  /**
   * 更新商品状态
   * @param id 商品 ID
   * @param status 商品状态
   */
  async updateStatus(id: string, data: ProductStatusRequest) {
    const product = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(product)
  }
}

export const productService = new ProductService()
