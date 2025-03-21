import { productCatalogSearchRequestSchema } from '~~/server/schema/modules/product-catalog'
/**
 * @openapi
 * /api/products/catalogs/search:
 *   post:
 *     summary: 搜索商品目录
 *     description: 管理员搜索商品目录列表。
 *     tags:
 *      - 商品目录
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
 *             $ref: '#/definitions/ProductCatalogSearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<ProductCatalogVO>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productCatalogSearchRequestSchema)
  const page = await getPageQuery(event)
  const productCatalogs = await productCatalogService.searchProductCatalogs(body, page)
  return Result.ok(productCatalogs)
}))
