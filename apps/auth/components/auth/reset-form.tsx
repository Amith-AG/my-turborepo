'use client'
import React, { useState, useTransition } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { resetSchema, resetType } from '@/schema/zod-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@repo/ui/components/ui/input'
import { Button } from '@repo/ui/components/ui/button'
import { CardWrapper } from './card-wrapper'
import { Label } from '@repo/ui/components/ui/label'
import { FormError, FormSucess } from './form-status'
import { ResetAction } from '@/action/reset'

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition()
  const [sucess, setSucess] = useState('')
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = async (data: resetType) => {
    console.log(data)
    setError('')
    setSucess('')
    startTransition(() => {
      ResetAction(data).then((res) => {
        res?.error && setError(res.error)
        res?.sucess && setSucess(res?.sucess)
      })
    })
  }
  return (
    <CardWrapper
      headerLabel=""
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Sign up now"
      className="w-[100%] h-[100%] p-2 shadow-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Label className="required">Email</Label>
        <Input {...register('email')} disabled={isPending} />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
        <Button type="submit">Login</Button>
      </form>
      {sucess && <FormSucess message={sucess} />}
      {error && <FormError message={error} />}
    </CardWrapper>
  )
}
