import { prismaDB } from "@/database-prisma";
import { cache } from "react";

export const getUsersWhoLikedPost = cache((postId: string): Promise<any> => {
  // Fetch all likes for the given postId and include user information
  const likes = prismaDB.like.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true, // Assuming there is a relation defined between Like and User
    },
  });

  // Extract usernames from the likes

  return likes;
});
