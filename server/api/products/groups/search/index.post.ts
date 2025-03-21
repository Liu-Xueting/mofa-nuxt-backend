import { productGroupSearchRequestSchema } from '~~/server/schema/modules/product-group'
/**
 * @openapi
 * /api/products/groups/search:
 *   post:
 *     summary: 搜索商品分组
 *     description: 管理员搜索商品分组列表。
 *     tags:
 *      - 商品分组
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
 *             $ref: '#/definitions/ProductGroupSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<ProductGroupVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productGroupSearchRequestSchema)
  const page = await getPageQuery(event)
  const productGroups = await productGroupService.searchProductGroups(body, page)
  return Result.ok(productGroups)
}))
