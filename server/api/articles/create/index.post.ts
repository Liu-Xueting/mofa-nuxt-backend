import { articleCreateRequestSchema } from '~~/server/schema/modules/article'

/**
 * @openapi
 * /api/articles/create:
 *   post:
 *     summary: 创建文章
 *     description: 返回创建的新文章
 *     tags:
 *      - 文章
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ArticleCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ArticleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, articleCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const articleVO = await articleService.createArticle(body, loginUserId)
  return Result.ok(articleVO)
}))
