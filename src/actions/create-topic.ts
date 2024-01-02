'use server'
import {z} from 'zod'
import {prismaDB} from '@/database-prisma'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {paths} from '@/path'
import {auth} from '@/auth'

const topicSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
})

type InitialStateType = {
  message: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export async function createTopic(
  initialState: InitialStateType,
  formData: FormData,
): Promise<InitialStateType> {
  const name = formData.get('name')
  const description = formData.get('description')

  const topicValidated = topicSchema.safeParse({name, description})

  if (!topicValidated.success) {
    return {
      message: topicValidated.error.flatten().fieldErrors,
    }
  }

  const {name: nameValidated, description: descriptionValidated} =
    topicValidated.data

  const session = await auth()
  if (!session || !session.user) {
    return {
      message: {
        _form: ['You need to be signed in'],
      },
    }
  }

  let topic
  try {
    topic = await prismaDB.topic.create({
      data: {
        slug: nameValidated,
        description: descriptionValidated,
      },
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        message: {
          _form: ['This topic already exists'],
        },
      }
    } else {
      return {
        message: {
          _form: ['Something went wrong'],
        },
      }
    }
  }
  revalidatePath('/')
  redirect(paths.topicShow(topic.slug))
  return initialState
}
