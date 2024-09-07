import z from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'this field is required' }).email(),
  password: z.string().min(1, 'this field is required'),
})
export const registrationSchema = z
  .object({
    username: z.string().min(1, { message: 'this field is required' }),
    email: z.string().min(1, { message: 'this field is required' }).email(),
    password: z.string().min(1, 'this field is required'),
    confirmPassword: z.string().min(1, 'this field is required'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: "password didn't match",
        path: ['confirmPassword'],
      })
    }
  })
export const resetSchema = z.object({
  email: z.string().min(1, { message: 'this field is required' }).email(),
})

export const newPasswordSchema = z
  .object({
    password: z.string().min(1, { message: 'this field is required' }),
    confirmPassword: z.string().min(1, 'this field is required'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: "password didn't match",
        path: ['confirmPassword'],
      })
    }
  })

export type registrationType = z.infer<typeof registrationSchema>
export type loginType = z.infer<typeof loginSchema>
export type resetType = z.infer<typeof resetSchema>
export type newPasswordType = z.infer<typeof newPasswordSchema>
