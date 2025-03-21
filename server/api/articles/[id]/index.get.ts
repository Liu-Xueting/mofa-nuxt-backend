/**
 * @openapi
 * /api/articles/{id}:
 *   get:
 *     summary: 获取文章详情
 *     description: 获取文章详情信息。
 *     tags:
 *      - 文章
 *     parameters:
 *      - name: id
 *        in: path
 *        description: 文章 ID
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: '`ResultType<ArticleVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const articleId = getPathId(event)
  const articleVO = await articleService.getArticleById(articleId)
  return Result.ok(articleVO)
}))
