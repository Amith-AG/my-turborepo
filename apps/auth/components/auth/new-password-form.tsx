'use client'
import { newPasswordSchema, newPasswordType } from '@/schema/zod-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CardWrapper } from './card-wrapper'
import { Label } from '@repo/ui/components/ui/label'
import { Input } from '@repo/ui/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { newPasswordAction } from '@/action/new-password'
import { Button } from '@repo/ui/components/ui/button'
import { FormError, FormSucess } from './form-status'

export default function NewPasswordForm() {
  const [error, setError] = useState('')
  const [sucess, setSucess] = useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const onSubmit = (data: newPasswordType) => {
    console.log(data)
    newPasswordAction(data, token).then((res) => {
      res?.error && setError(res.error)
      res?.sucess && setSucess(res.sucess)
    })
  }
  return (
    <CardWrapper
      headerLabel="Welcome to nextjs authjs v5"
      backButtonHref="/auth/login"
      backButtonLabel="Don't have an account? Sign up now"
      className="w-[100%] h-[100%] p-2 shadow-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Label className="required">Password</Label>
        <Input {...register('password')} />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
        <Label className="required">Confirm Password</Label>
        <Input {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
        <Button type="submit">Register</Button>
        {error && <FormError message={error} />}
        {sucess && <FormSucess message={sucess} />}
      </form>
    </CardWrapper>
  )
}
