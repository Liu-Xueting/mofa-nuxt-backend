import { productCatalogUpdateRequestSchema } from '~~/server/schema/modules/product-catalog'

/**
 * @openapi
 * /api/products/catalogs/{id}/update:
 *   put:
 *     summary: 更新产品目录
 *     description: 更新产品目录信息。
 *     tags:
 *      - 商品
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ProductCatalogUpdateRequest'
 *     responses:
 *       200:
 *         description: '`ResultType<ProductCatalogVO>`'
 */
export default defineEventHandler(wrap(async (event) => {
  const body = await validateBody(event, productCatalogUpdateRequestSchema)
  const catalogId = getPathId(event)
  const loginUserId = getLoginUserId(event)
  const productCatalogVO = await productCatalogService.updateProductCatalog(catalogId, body, loginUserId)
  return Result.ok(productCatalogVO)
}))
