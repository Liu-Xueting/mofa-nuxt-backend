import type { Sku } from '@prisma/client'
import { AbstractService } from '..'
import { toSkuVO } from '../vo'

/**
 * SKU 服务
 */
export class SKUService extends AbstractService<Sku> {
  delegate = prisma.sku

  /**
   * 转换为 VO
   * @param Sku SKU
   * @returns User
   */
  toVO(Sku?: Sku | null): SkuVO | null {
    return toSkuVO(Sku)
  }

  /**
   * 创建 SKU
   */
  async createSKU(data: SkuCreateRequest, createdBy?: string) {
    const Sku = await this.delegate.create({
      data: { ...data, createdBy },
    })
    return this.toVO(Sku)
  }

  /**
   * 通过 ID 获取 SKU
   * @param id SKU ID
   * @returns SKU
   */
  async getSKUById(id: string) {
    const Sku = await this.getById(id, { isDeleted: false })
    return this.toVO(Sku)
  }

  /**
   * 更新 SKU
   */
  async updateSKU(id: string, data: SkuUpdateRequest, updatedBy?: string) {
    const Sku = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(Sku)
  }

  /**
   * 删除 SKU
   * @param id SKU ID
   * @param updatedBy 更新者
   */
  async deleteSKU(id: string, updatedBy?: string) {
    const Sku = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(Sku)
  }
}

export const skuService = new SKUService()
