import { getUsersWhoLikedPost } from "@/actions/user-like-posts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
  }

  try {
    const usernames = await getUsersWhoLikedPost(postId);
    return NextResponse.json(usernames, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch likes" },
      { status: 500 }
    );
  }
}
