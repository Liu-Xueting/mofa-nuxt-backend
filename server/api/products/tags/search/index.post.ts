import { productTagSearchRequestSchema } from '~~/server/schema/modules/product-tag'
/**
 * @openapi
 * /api/products/tags/search:
 *   post:
 *     summary: 搜索商品标签
 *     description: 管理员搜索商品标签列表。
 *     tags:
 *      - 商品标签
 *     parameters:
 *      - name: page
 *        in: query
 *        description: 页码
 *        required: false
 *        type: integer
 *        default: 1
 *      - name: size
 *        in: query
 *        description: 每页数量
 *        required: false
 *        type: integer
 *        default: 10
 *     requestBody:
 *       description: 搜索条件
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/productTagSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<ProductTagVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productTagSearchRequestSchema)
  const page = await getPageQuery(event)
  const productTags = await productTagService.searchProductTags(body, page)
  return Result.ok(productTags)
}))
