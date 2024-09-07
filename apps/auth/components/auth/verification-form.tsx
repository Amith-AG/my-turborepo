'use client'

import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'

import { verificationAction } from '@/action/verification'
import { CardWrapper } from './card-wrapper'
import { FormError, FormSucess } from '@/components/auth/form-status'

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [sucess, setSucess] = useState<string | undefined>('')
  const searchParams = useSearchParams()
  const token = searchParams?.get('token')

  const onSubmit = useCallback(() => {
    if (sucess || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    verificationAction(token)
      .then((data) => {
        setSucess(data.sucess)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, sucess, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center w-full">
        {!sucess && !error && <BeatLoader />}
        {sucess && <FormSucess message={sucess} />}
        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}
