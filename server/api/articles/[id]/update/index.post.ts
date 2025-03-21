import { articleUpdateRequestSchema } from '~~/server/schema/modules/article'

/**
 * @openapi
 * /api/articles/{id}/update:
 *   post:
 *     summary: 更新文章
 *     description: 更新文章信息。
 *     tags:
 *      - 文章
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ArticleUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ArticleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, articleUpdateRequestSchema)
  const articleId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const articleVO = await articleService.updateArticle(articleId, body, loginUserId)
  return Result.ok(articleVO)
}))
