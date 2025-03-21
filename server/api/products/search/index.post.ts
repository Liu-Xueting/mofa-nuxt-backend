import { productSearchRequestSchema } from '~~/server/schema/modules/product'
/**
 * @openapi
 * /api/products/search:
 *   post:
 *     summary: 搜索商品
 *     description: 管理员搜索商品列表。
 *     tags:
 *      - 商品
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
 *             $ref: '#/definitions/ProductSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<ProductVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productSearchRequestSchema)
  const page = await getPageQuery(event)
  const products = await productService.searchProducts(body, page)
  return Result.ok(products)
}))
