import type { Agent } from '@prisma/client'
import type { AgentCreateRequest, AgentUpdateRequest } from '~~/server/schema/modules/agent'
import { AbstractService } from '..'
import { toAgentVO } from '../vo'

/**
 * 代理服务
 */
export class AgentService extends AbstractService<Agent> {
  delegate = prisma.agent

  /**
   * 转换为 VO
   * @param agent 代理
   * @returns 代理 VO
   */
  toVO(agent?: Agent | null): AgentVO | null {
    return toAgentVO(agent)
  }

  /**
   * 创建代理
   */
  async createAgent(data: AgentCreateRequest, createdBy?: string) {
    const agent = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(agent)
  }

  /**
   * 通过 ID 获取代理
   * @param id 代理 ID
   * @returns 代理
   */
  async getAgentById(id: string) {
    const agent = await this.getById(id, { isDeleted: false })
    return this.toVO(agent)
  }

  /**
   * 更新代理
   */
  async updateAgent(id: string, data: AgentUpdateRequest, updatedBy?: string) {
    const agent = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(agent)
  }

  /**
   * 删除代理
   * @param id 代理 ID
   * @param updatedBy 更新者
   */
  async deleteAgent(id: string, updatedBy?: string) {
    const agent = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(agent)
  }
}

export const agentService = new AgentService()
