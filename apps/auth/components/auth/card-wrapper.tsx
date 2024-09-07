import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@repo/ui/components/ui/card'
import { Social } from '@/components/auth/social'
import { Header } from './header-label'
import { BackButton } from './back-button'

type TCardWrapperProps = {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel?: string
  backButtonHref?: string
  showSocial?: boolean
  className?: string
}
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  className = 'w-[400px] shadow-xl',
}: TCardWrapperProps) => {
  return (
    <Card className={className || 'p-4'}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col">
        {showSocial && <Social />}
        {backButtonHref && backButtonLabel && (
          <BackButton label={backButtonLabel} href={backButtonHref} />
        )}
      </CardFooter>
    </Card>
  )
}
