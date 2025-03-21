/**
 * @openapi
 * /api/articles/{id}/delete:
 *   post:
 *     summary: 删除文章
 *     description: 管理员删除文章
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
  const articleVO = await articleService.deleteArticle(articleId)
  return Result.ok(articleVO)
}))
