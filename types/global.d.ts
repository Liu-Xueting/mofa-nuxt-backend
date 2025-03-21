declare global {
  /**
   * 返回结果
   */
  export interface ResultType<T = unknown> {
    /**
     * 状态码
     */
    code: number
    /**
     * 数据
     */
    data: T
    /**
     * 消息
     */
    msg: string
    /**
     * 追踪信息
     */
    traceId?: string
  }

  /**
   * 分页结果
   */
  interface PageType<T = unknown> {
    /**
     * 数据列表
     */
    list: T[]
    /**
     * 页面编号
     */
    page: number
    /**
     * 页面大小
     */
    size: number
    /**
     * 总数
     */
    total: number
  }

  /**
   * 分页参数
   */
  interface PageParamsType {
    /**
     * 页面编号
     */
    page: number
    /**
     * 页面大小
     */
    size: number
  }

  /**
   * 全局语言
   */
  export type GlobalLocale = 'en-US' | 'zh-CN'
}

export {}
