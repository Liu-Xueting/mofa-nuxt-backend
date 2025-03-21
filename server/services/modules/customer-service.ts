import type { CustomerService } from '@prisma/client'
import { AbstractService } from '..'
import { toCustomerServiceVO } from '../vo'

/**
 * 客服服务
 */
export class CustomerServiceService extends AbstractService<CustomerService> {
  delegate = prisma.customerService

  /**
   * 转换为 VO
   * @param customerService 客服
   * @returns 客服 VO
   */
  toVO(customerService?: CustomerService | null): CustomerServiceVO | null {
    return toCustomerServiceVO(customerService)
  }

  /**
   * 创建客服
   */
  async createCustomerService(data: CustomerServiceCreateRequest, createdBy?: string) {
    const customerService = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(customerService)
  }

  /**
   * 通过 ID 获取客服
   * @param id 客服 ID
   * @returns 客服
   */
  async getCustomerServiceById(id: string) {
    const customerService = await this.getById(id, { isDeleted: false })
    return this.toVO(customerService)
  }

  /**
   * 更新客服
   */
  async updateCustomerService(id: string, data: CustomerServiceUpdateRequest, updatedBy?: string) {
    const customerService = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(customerService)
  }

  /**
   * 删除客服
   * @param id 客服 ID
   * @param updatedBy 更新者
   */
  async deleteCustomerService(id: string, updatedBy?: string) {
    const customerService = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(customerService)
  }
}

export const customerServiceService = new CustomerServiceService()
