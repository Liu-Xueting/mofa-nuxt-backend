import { getUserById } from '~/api/user-api'

interface SignInResult {
  error: string | null
  status: number
  ok: boolean
  url: string
}

/**
 * 用户
 */
export const useUserStore = defineStore('user', () => {
  const user = ref<UserVO | null>(null)
  const { signIn, getSession } = useAuth()

  /**
   * 使用用户名密码登录
   * @param username 用户名
   * @param password 密码
   * @returns 登录结果
   */
  async function loginByCredentials(username: string, password: string) {
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    }) as SignInResult | null
    return res
  }

  /**
   * 更新用户数据
   */
  async function updateUserData() {
    const session = await getSession()
    const userId = session?.user?.id
    if (!userId) {
      return
    }
    const res = await getUserById(userId)
    user.value = res.data || null
  }

  return {
    user,
    loginByCredentials,
    updateUserData,
  }
})
