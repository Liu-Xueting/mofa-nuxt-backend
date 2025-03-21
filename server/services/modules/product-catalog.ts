import type { Prisma, ProductCatalog } from '@prisma/client'
import type { ProductCatalogVO } from '~~/types/vo'
import type { ProductCatalogCreateRequest, ProductCatalogSearchRequest, ProductCatalogUpdateRequest } from '../../schema/modules/product-catalog'
import { AbstractService } from '..'
import { toProductCatalogVO } from '../vo'

/**
 * 商品目录服务
 */
export class ProductCatalogService extends AbstractService<ProductCatalog> {
  delegate = prisma.productCatalog

  /**
   * 转换为 VO
   * @param productCatalog 商品目录
   * @returns 商品目录 VO
   */
  toVO(productCatalog?: ProductCatalog | null): ProductCatalogVO | null {
    return toProductCatalogVO(productCatalog)
  }

  /**
   * 创建产品目录
   * @param data 创建产品目录数据
   * @param createdBy 创建者
   */
  async createProductCatalog(data: ProductCatalogCreateRequest, createdBy?: string) {
    if (!data.parentId) {
      const productCatalog = await this.delegate.create({
        data: {
          ...data,
          createdBy,
        },
      })
      return this.toVO(productCatalog)
    } else {
      const productCatalog = await $transaction(async (ctx) => {
        const parent = await ctx.productCatalog.findFirst({
          where: {
            id: data.parentId,
          },
        })
        if (!parent) {
          throw new Error('父级商品目录不存在')
        }
        if (parent.isLeaf) {
          await ctx.productCatalog.update({
            where: {
              id: data.parentId,
            },
            data: {
              isLeaf: false,
            },
          })
        }
        const newProductCatalog = await this.delegate.create({
          data: {
            ...data,
            createdBy,
          },
        })
        return newProductCatalog
      })
      return this.toVO(productCatalog)
    }
  }

  /**
   * 通过 ID 获取商品目录
   * @param id 商品目录 ID
   * @returns 商品目录
   */
  async getProductCatalogById(id: string) {
    const productCatalog = await this.getById(id, { isDeleted: false })
    return this.toVO(productCatalog)
  }

  /**
   * 更新产品目录
   * @param id 产品目录 ID
   * @param data 更新产品目录数据
   * @param updatedBy 更新者
   */
  async updateProductCatalog(id: string, data: ProductCatalogUpdateRequest, updatedBy?: string) {
    const productCatalog = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(productCatalog)
  }

  /**
   * 删除商品目录
   * @param id 商品目录 ID
   * @param updatedBy 更新者
   */
  async deleteProductCatalog(id: string, updatedBy?: string) {
    const productCatalog = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(productCatalog)
  }

  /**
   * 搜索商品目录
   * @param data 搜索条件
   * @param pageParams 分页参数
   */
  async searchProductCatalogs(data: ProductCatalogSearchRequest, pageParams: PageParamsType): Promise<PageType<ProductCatalogVO>> {
    const { page, size } = pageParams
    const { keyword } = data
    const where: Prisma.ProductCatalogWhereInput = {
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
    const productCatalogs = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: productCatalogs.map(productCatalog => this.toVO(productCatalog)!),
      page,
      size,
    }
  }
}

export const productCatalogService = new ProductCatalogService()
