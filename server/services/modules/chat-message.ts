import type { ChatMessage } from '@prisma/client'
import { AbstractService } from '..'
import { toChatMessageVO } from '../vo'

/**
 * 聊天消息服务
 */
export class ChatMessageService extends AbstractService<ChatMessage> {
  delegate = prisma.chatMessage

  /**
   * 转换为 VO
   * @param chatMessage 聊天消息
   * @returns 聊天消息 VO
   */
  toVO(chatMessage?: ChatMessage | null): ChatMessageVO | null {
    return toChatMessageVO(chatMessage)
  }

  /**
   * 创建聊天消息
   */
  async createChatMessage(data: ChatMessageCreateRequest, createdBy?: string) {
    const chatMessage = await this.delegate.create({
      data: {
        ...data,
        createdBy,
      },
    })
    return this.toVO(chatMessage)
  }

  /**
   * 通过 ID 获取聊天消息
   * @param id 聊天消息 ID
   * @returns 聊天消息
   */
  async getChatMessageById(id: string) {
    const chatMessage = await this.getById(id, { isDeleted: false })
    return this.toVO(chatMessage)
  }

  /**
   * 更新聊天消息
   */
  async updateChatMessage(id: string, data: ChatMessageUpdateRequest, updatedBy?: string) {
    const chatMessage = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(chatMessage)
  }

  /**
   * 删除聊天消息
   * @param id 聊天消息 ID
   */
  async deleteChatMessage(id: string) {
    const chatMessage = await this.delegate.update({
      where: { id },
      data: { isDeleted: true },
    })
    return this.toVO(chatMessage)
  }
}

export const chatMessageService = new ChatMessageService()
