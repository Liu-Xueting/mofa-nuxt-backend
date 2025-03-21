import { productCatalogCreateRequestSchema } from '~~/server/schema/modules/product-catalog'

/**
 * @openapi
 * /api/products/catalogs/create:
 *   post:
 *     summary: 创建产品目录
 *     description: 返回创建的新产品目录
 *     tags:
 *      - 商品
 *     requestBody:
 *       description: '`{ ... }`'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductCatalogCreateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCatalogVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productCatalogCreateRequestSchema)
  const loginUserId = getLoginUserId(event)
  const productCatalogVO = await productCatalogService.createProductCatalog(body, loginUserId)
  return Result.ok(productCatalogVO)
}))
