import { cn } from '@repo/ui/lib/utils'
import { Poppins } from 'next/font/google'

const font = Poppins({
  subsets: ['latin'],
  weight: '600',
})

type THeaderProps = {
  label: string
}

export const Header = ({ label }: THeaderProps) => {
  return (
    <div className={'flex flex-col w-full text-center '}>
      <h1 className={cn('font-bold text-4xl', font.className)}>
        <p className="text-xl font-sans">
          Amith <span className="text-blue-500">AG</span>
        </p>
      </h1>
      <p className="text-sm">{label}</p>
    </div>
  )
}
