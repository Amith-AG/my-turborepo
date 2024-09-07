'use client'
import React, { useState, useTransition } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { registrationSchema } from '@/schema/zod-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@repo/ui/components/ui/input'
import { Button } from '@repo/ui/components/ui/button'
import { CardWrapper } from './card-wrapper'
import { Label } from '@repo/ui/components/ui/label'
import { RegisterAction } from '@/action/registration'
import { FormError, FormSucess } from './form-status'

export const RegisterForm = () => {
  type registerType = z.infer<typeof registrationSchema>
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [sucess, setSucess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const onSubmit = async (data: registerType) => {
    console.log(data)
    setError('')
    setSucess('')
    startTransition(() => {
      RegisterAction(data).then((res) => {
        res.error && setError(res.error)
        res.sucess && setSucess(res.sucess)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel="Welcome to nextjs authjs v5"
      showSocial
      backButtonHref="/auth/login"
      backButtonLabel="Don't have an account? Sign up now"
      className="w-[100%] h-[100%] p-2 shadow-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Label className="required">Username</Label>
        <Input {...register('username')} disabled={isPending} />
        {errors.username && (
          <span className="text-red-600">{errors.username.message}</span>
        )}
        <Label className="required">Email</Label>
        <Input {...register('email')} disabled={isPending} />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
        <Label className="required">Password</Label>
        <Input {...register('password')} disabled={isPending} />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
        <Label className="required">Confirm Password</Label>
        <Input {...register('confirmPassword')} disabled={isPending} />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
        <Button type="submit" disabled={isPending}>
          Register
        </Button>
        {error && <FormError message={error} />}
        {sucess && <FormSucess message={sucess} />}
      </form>
    </CardWrapper>
  )
}
