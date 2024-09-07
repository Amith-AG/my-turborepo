'use server'
import bcrypt from 'bcryptjs'
import { registrationSchema, registrationType } from '@/schema/zod-form'
import { db } from '@/lib/db'
import { getUserAccountByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/token'
import { sendVerificationEmail } from '@/lib/mail'

export const RegisterAction = async (formData: registrationType) => {
  try {
    const validation = registrationSchema.safeParse(formData)
    if (!validation.success) {
      return { error: 'Invaild form data.' }
    }
    const { username, email, password } = validation.data
    const existingUser = await getUserAccountByEmail(email)
    if (existingUser) {
      return { error: 'email already exist' }
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    const user = await db.user.create({
      data: {
        name: username,
        email: email,
        password: hashedpassword,
      },
    })
    if (!user) return { error: 'user couldnt be created' }
    await db.account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: email,
      },
    })
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(email, verificationToken.token)
    return { sucess: 'confimation email sent ! ' }
  } catch (error) {
    console.error({ error })
    return { error: 'Something went wrong' }
  }
}
