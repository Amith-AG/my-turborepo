'use server'
import { signIn } from '@/auth'
import { getUserAccountByEmail } from '@/data/user'
import { loginSchema, loginType } from '@/schema/zod-form'
import { AuthError } from 'next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { permanentRedirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '@/lib/token'
import { sendVerificationEmail } from '@/lib/mail'
export const LoginAction = async (
  data: loginType,
  callbackUrl: string | null,
) => {
  try {
    const validate = loginSchema.safeParse(data)
    if (!validate.success) {
      return { error: 'invalid form data' }
    }
    const { email, password } = validate.data
    const existUser = await getUserAccountByEmail(email)
    if (!existUser || !existUser.email || !existUser.password) {
      return { error: 'email not exist please register' }
    }
    const isPassword = bcrypt.compare(password, existUser.password)
    if (!isPassword) {
      return { error: 'password is incorrect' }
    }
    if (!existUser.emailVerified) {
      const verficationToken = await generateVerificationToken(email)
      await sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
      )
      return { sucess: 'confimation email sent!' }
    }
    await signIn('credentials', {
      email,
      password,
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
    console.log('im about to redirect')
    permanentRedirect('/rsc')
  } catch (error) {
    console.error(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: ' invalid credentials' }
        default:
          return { error: 'something went wrong.' }
      }
    }
  }
}
