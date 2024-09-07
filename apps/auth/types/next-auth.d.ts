import { DefaultSession } from 'next-auth'
import { DateTime } from 'next-auth/providers/kakao'

declare module 'next-auth' {
  interface Session {
    user: IUser
  }

  export type IUser = {
    id: string
    image: string
    name: string
    email: string
    emailVerified: DateTime
    role: UserRole
  }
  enum UserRole {
    USER,
    ADMIN,
  }
}
