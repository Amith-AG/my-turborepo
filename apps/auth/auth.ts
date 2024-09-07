import type { NextAuthConfig  } from 'next-auth'
import NextAuth, { CredentialsSignin } from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './lib/db'
import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from './schema/zod-form'
import { getUserAccountByEmail } from './data/user'
import bcrypt from 'bcryptjs'
import { Adapter   } from 'next-auth/adapters'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { encode } from 'next-auth/jwt'

class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super()
    this.code = code
    this.message = code
  }
}

const Credential = Credentials({
  credentials: {
    email: { label: 'email', type: 'text' },
    password: { label: 'password', type: 'password' },
  },
  async authorize(credentials) {
    try {
      const validate = await loginSchema.parseAsync(credentials)
      const { email, password } = validate
      const user = await getUserAccountByEmail(email)
      if (!user || !user.password) {
        throw 'account dont exist'
      }
      if (user.accounts[0]?.provider !== 'credentials') {
        throw `Please sign in with ${user.accounts[0]?.provider}`
      }
      const passwordmatch = await bcrypt.compare(password, user.password)
      if (!passwordmatch) {
        throw 'Pasword is Incorrect'
      }
      return user as any
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientUnknownRequestError
      )
        throw new InvalidLoginError(
          'System Error Occured. Please Contact Support Team',
        )
      if (error instanceof ZodError)
        throw new InvalidLoginError(error.errors[0]?.message!)
      throw error
    }
  },
})
const config = {
  providers: [Google, Github, Credential],
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: 'database' },
  callbacks: {
    async jwt({ account, user, token }) {
      if (account?.provider === 'credentials') {
        const sessionToken = uuidv4()
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000)

        const session = await PrismaAdapter(db).createSession!({
          userId: user.id!,
          sessionToken,
          expires,
        })
        token.sessionId = session.sessionToken
      }
      return token
    },
    session({ session }) {
      if (!session.user) return session
      const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        image: session.user.image,
        role: session.user.role,
      }
      session.user = user
      return session
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    async encode(arg) {
      return (arg.token?.sessionId as string) ?? encode(arg)
    },
  },
  events: {
    async signOut(message) {
      if ('session' in message && message.session?.sessionToken) {
        await db.session.deleteMany({
          where: {
            sessionToken: message.session.sessionToken,
          },
        })
      }
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  trustHost: true,
} satisfies NextAuthConfig
export const { handlers, auth, signIn, signOut } = NextAuth(config)
