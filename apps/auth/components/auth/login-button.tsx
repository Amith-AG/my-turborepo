'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
type LoginButtonProps = {
  mode: 'modal' | 'page'
  children: React.ReactNode
  asChild: boolean
}
export const LoginButton: React.FC<LoginButtonProps> = ({
  mode = 'page',
  children,
}) => {
  const Router = useRouter()

  const HandleOnClick = () => {
    Router.push('auth/login')
  }
  //TODO:Implement Modal

  if (mode == 'modal') {
    return <div></div>
  }
  return (
    <span onClick={HandleOnClick} className="cursor-pointer">
      {children}
    </span>
  )
}
