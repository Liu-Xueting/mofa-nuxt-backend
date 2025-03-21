import type { AgentApply } from '@prisma/client'
import type { AgentApplyCreateRequest, AgentApplyUpdateRequest } from '~~/server/schema/modules/agent-apply'
import type { AgentApplyVO } from '~~/types/vo'
import { AbstractService } from '..'
import { toAgentApplyVO } from '../vo'

/**
 * 代理申请服务
 */
export class AgentApplyService extends AbstractService<AgentApply> {
  delegate = prisma.agentApply

  /**
   * 转换为 VO
   * @param agentApply 代理申请
   * @returns 代理申请 VO
   */
  toVO(agentApply?: AgentApply | null): AgentApplyVO | null {
    return toAgentApplyVO(agentApply)
  }

  /**
   * 创建代理申请
   * @param userId 用户 ID
   * @param data 创建代理申请数据
   * @param createdBy 创建者
   */
  async createAgentApply(userId: string, data: AgentApplyCreateRequest, createdBy?: string) {
    const agentApply = await this.delegate.create({
      data: {
        userId,
        ...data,
        createdBy,
      },
    })
    return this.toVO(agentApply)
  }

  /**
   * 通过 ID 获取代理申请
   * @param id 代理申请 ID
   * @returns 代理申请
   */
  async getAgentApplyById(id: string): Promise<AgentApplyVO | null> {
    const agentApply = await this.getById(id, { isDeleted: false })
    return this.toVO(agentApply)
  }

  /**
   * 更新代理申请
   * @param id 代理申请 ID
   * @param data 更新代理申请数据
   * @param updatedBy 更新者
   */
  async updateAgentApply(id: string, data: AgentApplyUpdateRequest, updatedBy?: string) {
    const agentApply = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(agentApply)
  }

  /**
   * 删除代理申请
   * @param id 代理申请 ID
   * @param updatedBy 更新者
   */
  async deleteAgentApply(id: string, updatedBy?: string) {
    const agentApply = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(agentApply)
  }
}

export const agentApplyService = new AgentApplyService()
