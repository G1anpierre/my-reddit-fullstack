import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/path";
import { prismaDB } from "@/database-prisma";
import { fetchCommentsByPostId } from "@/get-data";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;
  const comments = await fetchCommentsByPostId(postId);

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <PostShow slug={slug} postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList comments={comments} />
    </div>
  );
}
