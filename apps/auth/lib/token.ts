import { v4 as uuidv4 } from 'uuid'
import { db } from './db'
import {
  getPasswordResetTokenByEmail,
  getVerficationTokenByEmail,
} from '@/data/token'
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000)
  const existingToken = await getVerficationTokenByEmail(email)
  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } })
  }
  const verficationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  })
  return verficationToken
}
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000)
  const existingToken = await getPasswordResetTokenByEmail(email)
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  console.log({ passwordResetToken })
  return passwordResetToken
}
