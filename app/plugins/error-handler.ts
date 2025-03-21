/**
 * 全局错误处理
 * @todo 上传到服务器
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error('Vue error:', error, instance, info)
  })
})
