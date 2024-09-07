import { VerificationForm } from '@/components/auth/verification-form'
import React, { Suspense } from 'react'

export default function VerificationPage() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
      <Suspense>
        <VerificationForm />
      </Suspense>
    </div>
  )
}
