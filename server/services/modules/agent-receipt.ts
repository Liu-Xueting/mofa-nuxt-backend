import type { AgentReceipt } from '@prisma/client'
import type { AgentReceiptCreateRequest, AgentReceiptUpdateRequest } from '~~/server/schema/modules/agent-receipt'
import type { AgentReceiptVO } from '~~/types/vo'
import { AbstractService } from '..'
import { toAgentReceiptVO } from '../vo'

/**
 * 代理收款服务
 */
export class AgentReceiptService extends AbstractService<AgentReceipt> {
  delegate = prisma.agentReceipt

  /**
   * 转换为 VO
   * @param agentReceipt 代理收款
   * @returns 代理收款 VO
   */
  toVO(agentReceipt?: AgentReceipt | null): AgentReceiptVO | null {
    return toAgentReceiptVO(agentReceipt)
  }

  /**
   * 创建代理回执
   * @param data 创建代理回执数据
   * @param createdBy 创建者
   */
  async createAgentReceipt(data: AgentReceiptCreateRequest, createdBy?: string) {
    const agentReceipt = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(agentReceipt)
  }

  /**
   * 获取代理回执信息
   * @param id 代理回执 ID
   * @returns 代理回执
   */
  async getAgentReceiptById(id: string): Promise<AgentReceiptVO | null> {
    const agentReceipt = await this.getById(id, { isDeleted: false })
    return this.toVO(agentReceipt)
  }

  /**
   * 更新代理回执
   * @param id 代理回执 ID
   * @param data 更新代理回执数据
   * @param updatedBy 更新者
   */
  async updateAgentReceipt(id: string, data: AgentReceiptUpdateRequest, updatedBy?: string) {
    const agentReceipt = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(agentReceipt)
  }

  /**
   * 删除代理收款
   * @param id 代理收款 ID
   * @param updatedBy 更新者
   */
  async deleteAgentReceipt(id: string, updatedBy?: string) {
    const agentReceipt = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(agentReceipt)
  }
}

export const agentReceiptService = new AgentReceiptService()
