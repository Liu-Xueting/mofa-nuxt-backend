/**
 * 自定义结果类型
 */
export class Result {
  /**
   * 失败内容
   * @param msg 失败消息
   * @param data 失败数据
   * @param code 失败代码
   * @returns JSON
   */
  static fail<T>(msg: string, data?: T, code = -1) {
    return {
      code,
      data,
      msg,
    }
  }

  /**
   * 成功
   * @param data 成功数据
   * @returns JSON
   */
  static ok<T>(data: T = null as T) {
    return {
      code: 0,
      data,
      msg: 'ok',
    }
  }
}
