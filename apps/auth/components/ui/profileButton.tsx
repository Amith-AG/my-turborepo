import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar'
import { LogoutButton } from '../auth/logout-button'
import { IoMdExit } from 'react-icons/io'
import { useSession } from 'next-auth/react'
import { LoginButton } from '../auth/login-button'

const ProfileButton = () => {
  const { status, data } = useSession()
  return status === 'authenticated' ? (
    <div className="flex gap-4 justify-center items-center">
      <span className="text-sm">Hello {data.user.name.split(' ')[0]}</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <Avatar>
            <AvatarImage src={data.user.image} alt="Avatar-Image" />
            <AvatarFallback>{data.user.name[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" disabled>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" disabled>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" disabled>
            Payment History
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <LogoutButton>
            <DropdownMenuItem>
              <IoMdExit className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <LoginButton mode="page" asChild>
      <div className="cursor-pointer flex justify-center items-center">
        <IoMdExit className="h-4 w-4 mr-2" />
        <span className="text-sm font-sans ">Sign In</span>
      </div>
    </LoginButton>
  )
}

export default ProfileButton
