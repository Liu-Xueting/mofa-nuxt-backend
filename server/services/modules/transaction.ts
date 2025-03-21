import type { Transaction } from '@prisma/client'
import type { TransactionCreateRequest, TransactionUpdateRequest } from '~~/server/schema/modules/transaction'
import { AbstractService } from '..'
import { toTransactionVO } from '../vo'

/**
 * 交易服务
 */
export class TransactionService extends AbstractService<Transaction> {
  delegate = prisma.transaction

  /**
   * 转换为 VO
   * @param transaction 交易
   * @returns User
   */
  toVO(transaction?: Transaction | null): TransactionVO | null {
    return toTransactionVO(transaction)
  }

  /**
   * 创建交易
   */
  async createTransaction(data: TransactionCreateRequest) {
    const transaction = await this.delegate.create({ data })
    return this.toVO(transaction)
  }

  /**
   * 通过 ID 获取交易
   * @param id 交易 ID
   * @returns 交易
   */
  async getTransactionById(id: string) {
    const transaction = await this.getById(id, { isDeleted: false })
    return this.toVO(transaction)
  }

  /**
   * 更新交易
   */
  async updateTransaction(id: string, data: TransactionUpdateRequest, updatedBy?: string) {
    const transaction = await this.delegate.update({
      where: { id },
      data: { ...data, updatedBy },
    })
    return this.toVO(transaction)
  }

  /**
   * 删除交易
   * @param id 交易 ID
   * @param updatedBy 更新者
   */
  async deleteTransaction(id: string, updatedBy?: string) {
    const transaction = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(transaction)
  }
}

export const transactionService = new TransactionService()
