import { prismaDB } from "@/database-prisma";
import { cache } from "react";

export const getUsersWhoLikedComment = cache(
  (commentId: string): Promise<any> => {
    const likes = prismaDB.like.findMany({
      where: {
        commentId: commentId,
      },
      include: {
        user: true,
      },
    });

    return likes;
  }
);
