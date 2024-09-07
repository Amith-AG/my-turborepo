'use server'

import { getUserByEmail } from '@/data/user'
import { sendNewPasswordEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/token'
import { resetSchema, resetType } from '@/schema/zod-form'

export const ResetAction = async (formdata: resetType) => {
  try {
    const validate = resetSchema.safeParse(formdata)
    if (!validate.success) {
      return { error: 'Invalid data !' }
    }
    const { email } = validate.data
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      return { error: "email doesn't exist" }
    }
    //TODO new-password token generate and send email impl
    const passwordResetToken = await generatePasswordResetToken(email)
    console.log(passwordResetToken)
    if (!passwordResetToken) return { error: 'internal server error' }
    await sendNewPasswordEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    )
    return { sucess: 'Reset email sent !' }
  } catch (error) {
    console.log(error)
    return { error: 'something went wrong' }
  }
}
