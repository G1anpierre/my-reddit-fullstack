import Link from "next/link";
import { paths } from "@/path";
import { LikeButton } from "../common/like-button";
import { PostsWithDataType } from "@/schema";
import { likePost } from "@/actions/like-post";
interface PostListProps {
  fetchData: () => Promise<PostsWithDataType>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <div key={post.id} className="border rounded p-2 flex flex-col gap-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
        <LikeButton
          post={post}
          actionFn={likePost.bind(null, { postId: post.id })}
          type="post"
        />
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
