import type { AuthOptions, DefaultSession, DefaultUser } from 'next-auth'
import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

type CredentialsProviderType = typeof CredentialsProvider
type Adapter = AuthOptions['adapter']
// @ts-expect-error You need to use .default here for it to work during SSR.
const CredentialsProviderDefault: CredentialsProviderType = CredentialsProvider.default

/**
 * @openapi
 * /api/auth/{*param1}:
 *   get:
 *     summary: 鉴权入口
 *     description: 'Nuxt Auth 鉴权入口，不要直接请求此接口，请参考 [Nuxt Auth 文档](https://sidebase.io/nuxt-auth/)。'
 *     tags:
 *      - 鉴权
 *     responses:
 *       200:
 *         description: '参见文档'
 */
export default NuxtAuthHandler({
  pages: {
    error: '/error',
    newUser: '/register',
    signIn: '/login',
    signOut: '/logout',
    verifyRequest: '/verify-request',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProviderDefault({
      async authorize(credentials) {
        try {
          return await userService.login(credentials)
        } catch (error) {
          console.error(error)
          return null
        }
      },
      credentials: {
        password: { label: 'Password', type: 'password' },
        username: { label: 'Username', type: 'text' },
      },
      name: 'credentials',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ''
      }
      return session
    },
  },
  secret: useRuntimeConfig().authSecret,
  session: {
    strategy: 'jwt',
  },
})

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
  }
}
