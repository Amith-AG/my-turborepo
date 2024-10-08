'use client'
import React, { useState, useTransition } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/schema/zod-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@repo/ui/components/ui/input'
import { Button } from '@repo/ui/components/ui/button'
import { CardWrapper } from './card-wrapper'
import { Label } from '@repo/ui/components/ui/label'
import { LoginAction } from '@/action/login'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormError, FormSucess } from './form-status'
import Link from 'next/link'
import { Ghost } from 'lucide-react'

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [sucess, setSucess] = useState('')
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const router = useRouter()
  type logintype = z.infer<typeof loginSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (data: logintype) => {
    console.log(data)
    console.log('callbackUrl in form:', callbackUrl)
    setError('')
    setSucess('')
    startTransition(() => {
      LoginAction(data, callbackUrl).then((res) => {
        res?.error && setError(res.error)
        res?.sucess && setSucess(res?.sucess)
      })
      router.refresh()
    })
  }
  return (
    <CardWrapper
      headerLabel="Welcome to nextjs authjs v5"
      showSocial
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
        <Label className="required">Passwords</Label>
        <Input {...register('password')} disabled={isPending} />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
        <Button
          variant={'link'}
          asChild
          className="text-sm font-normal self-end"
        >
          <Link href="/auth/reset">forget password?</Link>
        </Button>
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
      {sucess && <FormSucess message={sucess} />}
      {error && <FormError message={error} />}
    </CardWrapper>
  )
}
