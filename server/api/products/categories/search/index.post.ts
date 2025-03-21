import { productCategorySearchRequestSchema } from '~~/server/schema/modules/product-category'
/**
 * @openapi
 * /api/products/categories/search:
 *   post:
 *     summary: 搜索商品类别
 *     description: 管理员搜索商品类别列表。
 *     tags:
 *      - 商品类别
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
 *             $ref: '#/definitions/ProductCategorySearchRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<PageType<ProductCategory>>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productCategorySearchRequestSchema)
  const page = await getPageQuery(event)
  const productCategories = await productCategoryService.searchProductCategories(body, page)
  return Result.ok(productCategories)
}))
