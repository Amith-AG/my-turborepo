'use client'
import { Button } from '@repo/ui/components/ui/button'
import Link from 'next/link'

interface BackButtonProps {
  label: string
  href: string
}
export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant={'link'} size={'sm'} className="font-normal">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
