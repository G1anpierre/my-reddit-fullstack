import { getUsersWhoLikedComment } from "@/actions/user-like-comments";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId");

  try {
    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }
    const likes = await getUsersWhoLikedComment(commentId);
    return NextResponse.json(likes);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
