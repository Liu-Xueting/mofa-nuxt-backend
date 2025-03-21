import type { Prisma, RetailerApply } from '@prisma/client'
import type { RetailerApplySearchRequest, RetailerApplyStatusRequest } from '../../schema/modules/retailer-apply'
import { AbstractService } from '..'
import { toRetailerApplyVO } from '../vo'

/**
 * 门店申请服务
 */
export class RetailerApplyService extends AbstractService<RetailerApply> {
  delegate = prisma.retailerApply

  /**
   * 转换为 VO
   * @param retailerApply 门店申请
   * @returns 门店申请 VO
   */
  toVO(retailerApply?: RetailerApply | null): RetailerApplyVO | null {
    return toRetailerApplyVO(retailerApply)
  }

  /**
   * 创建门店申请
   */
  async createRetailerApply(userId: string, data: RetailerApplyCreateRequest, createdBy?: string) {
    const retailerApply = await this.delegate.create({
      data: {
        userId,
        ...data,
        createdBy,
      },
    })
    return this.toVO(retailerApply)
  }

  /**
   * 通过 ID 获取门店申请
   * @param id 门店申请 ID
   * @returns 门店申请
   */
  async getRetailerApplyById(id: string) {
    const retailerApply = await this.getById(id, { isDeleted: false })
    return this.toVO(retailerApply)
  }

  /**
   * 更新门店申请
   */
  async updateRetailerApply(id: string, data: RetailerApplyUpdateRequest, updatedBy?: string) {
    const retailerApply = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(retailerApply)
  }

  /**
   * 删除门店申请
   * @param id 门店申请 ID
   * @param updatedBy 更新者
   */
  async deleteRetailerApply(id: string, updatedBy?: string) {
    const retailerApply = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(retailerApply)
  }

  /**
   * 搜索门店申请
   */
  async searchRetailerApplies(data: RetailerApplySearchRequest, pageParams: PageParamsType): Promise<PageType<RetailerApplyVO>> {
    const { page, size } = pageParams
    const { keyword, createdAtFrom, createdAtTo, status } = data
    const where: Prisma.RetailerApplyWhereInput = {
      isDeleted: false,
      createdAt: {
        gte: createdAtFrom,
        lte: createdAtTo,
      },
      status,
      OR: [
        {
          realName: {
            contains: keyword,
          },
        },
        {
          retailerName: {
            contains: keyword,
          },
        },
      ],
    }
    const total = await this.delegate.count({
      where,
    })
    const retailerApplies = await this.delegate.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    })
    return {
      total,
      list: retailerApplies.map(retailerApply => this.toVO(retailerApply)!),
      page,
      size,
    }
  }

  /**
   * 修改店铺申请状态
   */
  async updateStatus(id: string, data: RetailerApplyStatusRequest) {
    const retailerApply = await this.delegate.update({
      where: { id },
      data,
    })
    return this.toVO(retailerApply)
  }
}

export const retailerApplyService = new RetailerApplyService()
