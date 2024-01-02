import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import {PrismaAdapter} from '@auth/prisma-adapter'
import {prismaDB} from './database-prisma'

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prismaDB),
  callbacks: {
    async session({session, user}) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
})
