'use client'

import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import {useSession} from 'next-auth/react'
import {signIn} from '@/actions'
import {signOut} from '@/actions'
import React from 'react'

export const HeaderAuth = () => {
  const session = useSession()

  return (
    <>
      {session.data ? (
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Avatar src={session.data.user?.image || ''} size="lg" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 cursor-pointer">
              <form action={signOut}>
                <Button type="submit" color="primary" variant="flat">
                  Sign Out
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <>
          <NavbarItem className="hidden lg:flex">
            <form action={signIn}>
              <Button type="submit" color="secondary">
                Login
              </Button>
            </form>
          </NavbarItem>
          <NavbarItem>
            <form action={signIn}>
              <Button type="submit" color="primary" variant="flat">
                Sign Up
              </Button>
            </form>
          </NavbarItem>
        </>
      )}
    </>
  )
}
