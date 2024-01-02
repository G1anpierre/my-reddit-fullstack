import {Post} from '@prisma/client'
import {prismaDB} from './database-prisma'
import {cache} from 'react'

export type PostWithData = Post & {
  topic: {slug: string}
  user: {name: string | null}
  _count: {comments: number}
}
// export type PostWithData = Awaited<ReturnType<typeof fetchPostsBySlug>>[number]

export const fetchPostsBySlug = cache(
  (slug: string): Promise<PostWithData[]> => {
    const posts = prismaDB.post.findMany({
      where: {
        topic: {
          slug,
        },
      },
      include: {
        topic: {select: {slug: true}},
        user: {select: {name: true}},
        _count: {select: {comments: true}},
      },
    })

    return posts
  },
)

export const fetchTopPosts = cache((): Promise<PostWithData[]> => {
  const posts = prismaDB.post.findMany({
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    include: {
      topic: {select: {slug: true}},
      user: {select: {name: true}},
      _count: {select: {comments: true}},
    },
    take: 5,
  })

  return posts
})

export const searchTerms = (term: string) => {
  const results = prismaDB.post.findMany({
    include: {
      topic: {select: {slug: true}},
      user: {select: {name: true}},
      _count: {select: {comments: true}},
    },
    where: {
      OR: [{title: {contains: term}}, {content: {contains: term}}],
    },
  })
  return results
}
