import {OpenTopicModal} from '@/components/openTopicModal'
import PostList from '@/components/posts/post-list'
import {TopicsList} from '@/components/topicsList'
import {fetchTopPosts} from '@/get-data'

export default async function Home() {
  return (
    <main>
      <div className="grid grid-cols-3 mb-4 gap-3">
        <h1>Top Posts</h1>
        <div className="flex flex-col gap-4 col-start-3">
          <OpenTopicModal />
          <TopicsList />
        </div>
        <div className="col-span-2">
          <PostList fetchData={fetchTopPosts} />
        </div>
      </div>
    </main>
  )
}
