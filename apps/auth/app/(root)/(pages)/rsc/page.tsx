import { auth, signOut } from '@/auth'
import { Button } from '@repo/ui/components/ui/button'
export default async function ServerPage() {
  const session = await auth()
  const user = session?.user

  return (
    <div>
      <p>{JSON.stringify(user, null, 2)}</p>
      {session && (
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/' })
          }}
        >
          <Button>Logout</Button>
        </form>
      )}
    </div>
  )
}
