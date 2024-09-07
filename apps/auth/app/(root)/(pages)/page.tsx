import React from 'react'
import { Button } from '@repo/ui/components/ui/button'
import Image from 'next/image'
import { AuroraBackgroundComp } from '@/components/Aurora-Background'
import { LoginButton } from '@/components/auth/login-button'

export default async function Dashboard() {
  return (
    <div>
      <AuroraBackgroundComp>
        <Image
          src="/nextAuthIcon.png"
          width={'85'}
          height={'85'}
          alt="Next Auth Icon"
        />
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Seamless Authentication with Next.js!
        </div>
        <div className="font-extralight text-center text-base md:text-4xl dark:text-neutral-200 py-4">
          Implemention of Authentication with Next Auth v5
        </div>
        <LoginButton mode="page" asChild>
          <Button className="rounded-full w-fit text-white ">Sign In</Button>
        </LoginButton>
      </AuroraBackgroundComp>
    </div>
  )
}
