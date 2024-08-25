"use server";
import { auth } from "@/auth";
import { prismaDB } from "@/database-prisma";
import { revalidatePath } from "next/cache";

export async function likeComment(
  { commentId }: { commentId: string },
  formState: any,
  formData: FormData
) {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You need to be signed in"],
      },
    };
  }

  try {
    const like = await prismaDB.like.findFirst({
      where: {
        commentId: commentId,
        userId: session.user.id,
      },
    });

    if (like) {
      await prismaDB.like.delete({
        where: {
          id: like.id,
        },
      });
    } else {
      await prismaDB.like.create({
        data: {
          commentId: commentId,
          userId: session.user.id,
        },
      });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: {
          _form: [e.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }
  revalidatePath("/");
}
