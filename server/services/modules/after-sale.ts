import type { AfterSale } from '@prisma/client'
import type { AfterSaleCreateRequest, AfterSaleUpdateRequest } from '~~/server/schema/modules/after-sale'
import { AbstractService } from '..'
import { toAfterSaleVO } from '../vo'

/**
 * 售后服务
 */
export class AfterSaleService extends AbstractService<AfterSale> {
  delegate = prisma.afterSale

  /**
   * 转换为 VO
   * @param afterSale 售后
   * @returns 售后 VO
   */
  toVO(afterSale?: AfterSale | null): AfterSaleVO | null {
    return toAfterSaleVO(afterSale)
  }

  /**
   * 创建售后
   */
  async createAfterSale(data: AfterSaleCreateRequest, createdBy?: string) {
    const afterSale = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(afterSale)
  }

  /**
   * 通过 ID 获取售后
   * @param id 售后 ID
   * @returns 售后
   */
  async getAfterSaleById(id: string) {
    const afterSale = await this.getById(id, { isDeleted: false })
    return this.toVO(afterSale)
  }

  /**
   * 更新售后
   */
  async updateAfterSale(id: string, data: AfterSaleUpdateRequest, updatedBy?: string) {
    const afterSale = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(afterSale)
  }

  /**
   * 删除售后
   * @param id 售后 ID
   * @param updatedBy 更新者
   */
  async deleteAfterSale(id: string, updatedBy?: string) {
    const afterSale = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(afterSale)
  }
}

export const afterSaleService = new AfterSaleService()
