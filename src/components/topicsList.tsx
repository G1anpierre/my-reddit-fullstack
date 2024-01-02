import {prismaDB} from '@/database-prisma'
import {paths} from '@/path'
import {Chip, Link} from '@nextui-org/react'
import React from 'react'

export const TopicsList = async () => {
  const topics = await prismaDB.topic.findMany()

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map(topic => (
        <Link key={topic.id} href={paths.topicShow(topic.slug)}>
          <Chip color="warning">{topic.slug}</Chip>
        </Link>
      ))}
    </div>
  )
}
