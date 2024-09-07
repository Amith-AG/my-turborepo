'use server'

import { getVerficationTokenByToken } from '@/data/token'
import { getUserAccountByEmail } from '@/data/user'
import { db } from '@/lib/db'

export async function verificationAction(token: string) {
  try {
    const existingToken = await getVerficationTokenByToken(token)
    console.log({ existingToken })
    if (!existingToken) {
      return { error: 'token doesnt exist' }
    }
    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
      return { error: 'token expired' }
    }
    const existingUser = await getUserAccountByEmail(existingToken.email)
    if (!existingUser) {
      return { erro: 'user doesnt exist' }
    }
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    })
    await db.verificationToken.delete({ where: { id: existingToken.id } })
    return { sucess: 'Email Verified' }
  } catch (error) {
    console.error(error)
    return { error: 'something went wrong' }
  }
}
