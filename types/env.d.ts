/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Nuxt 鉴权服务地址
   */
  readonly NUXT_AUTH_ORIGIN?: string
  /**
   * JWT 密钥
   */
  readonly NUXT_AUTH_SECRET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {
      /**
       * MongoDB 连接地址
       */
      DATABASE_URL?: string
      /**
       * Redis 连接地址
       */
      REDIS_URL?: string
      /**
       * RabbitMQ 连接地址
       */
      RABBITMQ_URL?: string
      /**
       * 网易云信 AppKey
       */
      NIM_APP_KEY?: string
      /**
       * 是否禁用 OpenAPI
       */
      OPENAPI_DISABLE?: string
      /**
       * Swagger 服务器地址
       */
      OPENAPI_SERVER_URL?: string
      /**
       * OpenAPI 规范地址
       */
      OPENAPI_SPEC_URL?: string
    }
  }
}

export {}
