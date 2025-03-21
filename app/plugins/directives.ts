import { focus } from './directives/focus'
import { permission } from './directives/permission'

/**
 * 在此添加自定义指令
 */
export const RegisterDirectives = {
  focus,
  permission,
}

export type RegisterDirectivesKey = keyof typeof RegisterDirectives

/**
 * 注册自定义指令
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  // nuxtApp.vueApp.directive('focus', vFocus())
  Object.keys(RegisterDirectives).forEach((key) => {
    nuxtApp.vueApp.directive(
      key,
      RegisterDirectives[key as RegisterDirectivesKey](),
    )
  })
})
