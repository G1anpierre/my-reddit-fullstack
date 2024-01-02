import {prismaDB} from '@/database-prisma'
import {notFound} from 'next/navigation'

interface PostShowProps {
  slug: string
  postId: string
}

export default async function PostShow({slug, postId}: PostShowProps) {
  const post = await prismaDB.post.findFirst({
    where: {
      id: postId,
      topic: {
        slug,
      },
    },
  })

  if (!post) {
    // notFound()
    return <div>Post not found</div>
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  )
}
