import { AuroraBackgroundComp } from '@/components/Aurora-Background'
import { ResetForm } from '@/components/auth/reset-form'
import { Button } from '@repo/ui/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default function Login() {
  return (
    <div className="flex w-full h-full">
      <div className="w-[500px] ">
        <Suspense>
          <ResetForm />
        </Suspense>
      </div>
      <div className="w-full h-full">
        <AuroraBackgroundComp>
          <Image
            src="/nextAuthIcon.png"
            width={'85'}
            height={'85'}
            alt="Next Auth Icon"
          />
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Auth.js
          </div>
          <div className="font-extralight text-center text-base md:text-4xl dark:text-neutral-200 py-4">
            Authentication for the Web. Free and open source.
          </div>
          <Button>
            <Link href={'https://authjs.dev/'}>📄Learn More about Authjs</Link>
          </Button>
        </AuroraBackgroundComp>
      </div>
    </div>
  )
}
