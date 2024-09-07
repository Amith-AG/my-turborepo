import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/verification?token=${token}`
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verification:Authjs v5 demo project',
    html: `<p>welcome to my Auth v5 demo.please click <a href=${confirmationLink}>here </a> to confirm </P>`,
  })
}
export const sendNewPasswordEmail = async (email: string, token: string) => {
  const changePasswordLink = `http://localhost:3000/auth/new-password?token=${token}`
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Change password:Authjs v5 project',
    html: `<p>click <a href=${changePasswordLink}>here </a> to change the password</P>`,
  })
}
