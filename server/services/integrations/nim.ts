import process from 'node:process'
import NIM from 'nim-web-sdk-ng'

/**
 * 网易云信实例
 */
export const nim = NIM.getInstance(
  {
    appkey: process.env.NIM_APP_KEY!,
    debugLevel: 'debug',
    apiVersion: 'v2',
  },
  {},
)
