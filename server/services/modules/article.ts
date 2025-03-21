import type { Article } from '@prisma/client'
import type { ArticleCreateRequest, ArticleUpdateRequest } from '~~/server/schema/modules/article'
import type { ArticleVO } from '~~/types/vo'
import { AbstractService } from '..'
import { toArticleVO } from '../vo'

/**
 * 文章服务
 */
export class ArticleService extends AbstractService<Article> {
  delegate = prisma.article

  /**
   * 转换为 VO
   * @param article 文章
   * @returns 文章 VO
   */
  toVO(article?: Article | null): ArticleVO | null {
    return toArticleVO(article)
  }

  /**
   * 创建文章
   * @param userId 用户 ID
   * @param data 创建文章数据
   * @param createdBy 创建者
   */
  async createArticle(userId: string, data: ArticleCreateRequest, createdBy?: string) {
    const article = await this.delegate.create({
      data: {
        userId,
        ...data,
        createdBy,
      },
    })
    return this.toVO(article)
  }

  /**
   * 通过 ID 获取文章
   * @param id 文章 ID
   * @returns 文章
   */
  async getArticleById(id: string): Promise<ArticleVO | null> {
    const article = await this.getById(id, { isDeleted: false })
    return this.toVO(article)
  }

  /**
   * 更新文章
   * @param id 文章 ID
   * @param data 更新文章数据
   * @param updatedBy 更新者
   */
  async updateArticle(id: string, data: ArticleUpdateRequest, updatedBy?: string) {
    const article = await this.delegate.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    })
    return this.toVO(article)
  }

  /**
   * 删除文章
   * @param id 文章 ID
   * @param updatedBy 更新者
   */
  async deleteArticle(id: string, updatedBy?: string) {
    const article = await this.delegate.update({
      where: { id },
      data: { isDeleted: true, updatedBy },
    })
    return this.toVO(article)
  }
}

export const articleService = new ArticleService()
