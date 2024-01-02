'use server'
import {z} from 'zod'
import {prismaDB} from '@/database-prisma'
import {paths} from '@/path'
import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {auth} from '@/auth'
import {Post, Topic} from '@prisma/client'

const postSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10).max(255),
})

type InitialStateType = {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export async function createPost(
  topic: any,
  initialState: InitialStateType,
  formData: FormData,
): Promise<InitialStateType> {
  console.log('topic', topic)
  const title = formData.get('title')
  const content = formData.get('content')

  const postValidated = postSchema.safeParse({title, content})

  if (!postValidated.success) {
    return {
      errors: postValidated.error.flatten().fieldErrors,
    }
  }

  const {title: titleValidated, content: contentValidated} = postValidated.data

  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You need to be signed in'],
      },
    }
  }
  let topicFound: Topic | null
  try {
    topicFound = await prismaDB.topic.findFirst({
      where: {
        slug: topic,
      },
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: {
          _form: [e.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      }
    }
  }

  if (!topicFound) {
    return {
      errors: {
        _form: ['Topic not found'],
      },
    }
  }
  let post: Post
  try {
    post = await prismaDB.post.create({
      data: {
        title: titleValidated,
        content: contentValidated,
        userId: session.user.id,
        topicId: topicFound.id,
      },
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: {
          _form: [e.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      }
    }
  }
  revalidatePath(paths.topicShow(topicFound.slug))
  redirect(paths.postShow(topicFound.slug, post.id))
  return initialState
}
