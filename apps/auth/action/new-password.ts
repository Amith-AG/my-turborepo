'use server'

import { getPasswordResetTokenByToken } from '@/data/token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { newPasswordSchema, newPasswordType } from '@/schema/zod-form'
import bcrypt from 'bcryptjs'

export const newPasswordAction = async (
  formData: newPasswordType,
  token: string | null,
) => {
  if (!token) {
    return { error: 'token missing' }
  }
  const validate = newPasswordSchema.safeParse(formData)
  if (!validate.success) {
    return { error: 'Invalid data' }
  }
  const { password } = validate.data
  const existingToken = await getPasswordResetTokenByToken(token)
  if (!existingToken) {
    return { error: "token doesn't exist" }
  }
  const { email, expires } = existingToken
  const hasExpire = new Date(expires) < new Date()
  if (hasExpire) {
    return { error: 'token expired' }
  }
  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: "user doesn't exist" }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  })
  await db.passwordResetToken.delete({ where: { id: existingToken.id } })
  return { sucess: 'password changed' }
}
