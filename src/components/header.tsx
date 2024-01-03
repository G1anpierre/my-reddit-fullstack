import {Navbar, NavbarBrand, NavbarContent} from '@nextui-org/react'
import {HeaderAuth} from './headerAuth'
import Link from 'next/link'
import {InputSearch} from './inputSearch'
import {Suspense} from 'react'

export default function Header() {
  return (
    <Navbar className="mb-4 py-4">
      <NavbarBrand>
        <Link href="/" className="flex gap-1">
          <span>Logo</span>
          <p className="font-bold text-inherit">ACME</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Suspense>
          <InputSearch />
        </Suspense>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}
