import process from 'node:process'
import { createDefu } from 'defu'
import { isArray } from 'es-toolkit/compat'
import swaggerJSDoc from 'swagger-jsdoc'

/**
 * 增量合并 Nitro OpenAPI 到 Swagger OpenAPI
 */
const merger = createDefu((obj, key, value) => {
  if (key === 'tags' && isArray(value) && isArray(obj[key])) {
    obj[key] = value
    return true
  }
})

/**
 * @openapi
 * /api/_openapi:
 *   get:
 *     summary: OpenAPI 文档
 *     description: |
 *       返回项目的 OpenAPI 文档（JSON）。
 *       > 此接口会合并 Nitro 自动生成的 OpenAPI 信息，减少重复工作。
 *     tags:
 *      - 文档
 *     responses:
 *       200:
 *         description: 'JSON 格式的 OpenAPI 文档'
 *       403:
 *         description: '生产时禁止访问'
 */
export default defineEventHandler(async () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const config = useRuntimeConfig()
  const swaggerDefinition: swaggerJSDoc.Options['swaggerDefinition'] = {
    openapi: config.swagger.openapi,
    info: {
      title: config.swagger.title,
      version: config.swagger.version,
    },
    schemes:
      process.env.OPENAPI_SCHEMA_HTTPS === 'true'
        ? ['https']
        : ['http'],
    components: {},
    security: [],
  }

  const options: swaggerJSDoc.Options = {
    swaggerDefinition,
    apis: config.swagger.apis,
  }
  const swagger = swaggerJSDoc(options)
  const nitroReq = await fetch(config.swagger.nitroOpenAPI)
  const nitroOpenAPI = await nitroReq.json()
  // 删除无效路径
  nitroOpenAPI.paths = Object.fromEntries(
    Object.entries(nitroOpenAPI.paths).filter(
      ([key, value]) => key && Object.keys(value as object).length > 0,
    ),
  )

  return merger(swagger, nitroOpenAPI)
})
