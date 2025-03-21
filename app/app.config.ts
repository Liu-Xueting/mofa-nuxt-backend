/**
 * App 范围内配置，仅作用于客户端，支持响应式值，函数等，可在运行时修改
 */
export default defineAppConfig({
  baseConfig: {
    /**
     * 判断用户是否有给定权限
     */
    hasPermission: (binding: string[]) => binding.includes('admin'),
  },
})
