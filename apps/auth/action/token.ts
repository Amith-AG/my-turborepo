'use server'
import { getSessionById } from '@/data/token'
import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'
export const generateSessionToken = async (id: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 30 * 86400000)
  const existingSession = await getSessionById(id)
  if (existingSession) {
    await db.session.deleteMany({ where: { userId: existingSession.userId } })
  }
  await db.session.create({
    data: {
      sessionToken: token,
      userId: id,
      expires,
    },
  })
}
