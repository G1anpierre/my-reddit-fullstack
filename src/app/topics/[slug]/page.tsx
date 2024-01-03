import {OpenPostModal} from '@/components/openPostModal'
import PostList from '@/components/posts/post-list'
import {fetchPostsBySlug} from '@/get-data'
import React from 'react'

type TopicPageProps = {
  params: {
    slug: string
  }
}

const TopicPage = ({params}: TopicPageProps) => {
  return (
    <div>
      <div className="grid grid-cols-3 mb-4 gap-3">
        <h1 className="text-xl mb-2">Topic - {params.slug}</h1>
        <div className="col-start-3">
          <OpenPostModal topic={params.slug} />
        </div>
      </div>
      <div>
        <PostList fetchData={() => fetchPostsBySlug(params.slug)} />
      </div>
    </div>
  )
}

export default TopicPage
