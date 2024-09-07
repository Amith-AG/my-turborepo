"use client"
import { Button } from '@repo/ui/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from "next-auth/react"

const onHandleClick=(provider:"google"|"github")=>{
 signIn(provider)
}
export const Social = () => {
  return (
    <div className="flex gap-2 w-full item-center justify-center">
      <Button variant={'outline'} className="w-full" onClick={()=>onHandleClick("google")}>
        <FcGoogle />
      </Button>
      <Button variant={'outline'} className="w-full" onClick={()=>(onHandleClick("github"))}>
        <FaGithub />
      </Button>
    </div>
  )
}
