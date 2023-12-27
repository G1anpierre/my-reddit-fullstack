import {Button} from '@nextui-org/button'
import * as actions from '@/actions'
import {auth} from '@/auth'

export default async function Home() {
  const session = await auth()
  console.log('session :', session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!session ? (
        <form action={actions.signIn}>
          <Button type="submit">Sign In</Button>
        </form>
      ) : (
        <form action={actions.signOut}>
          <Button type="submit">Sign Out</Button>
        </form>
      )}
    </main>
  )
}
