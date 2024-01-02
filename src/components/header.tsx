import {Navbar, NavbarBrand, NavbarContent, Input} from '@nextui-org/react'
import {HeaderAuth} from './headerAuth'
import Link from 'next/link'
import {InputSearch} from './inputSearch'

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">
          <span>Logo</span>
          <p className="font-bold text-inherit">ACME</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <InputSearch />
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}
