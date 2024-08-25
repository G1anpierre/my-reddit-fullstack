import { z } from "zod";

const PostWithDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  userId: z.string(),
  topicId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  topic: z.object({
    slug: z.string(),
  }),
  user: z.object({
    name: z.string().nullable(),
  }),
  likes: z.array(z.any()), // Adjust the type if you have more details about the likes
  _count: z.object({
    comments: z.number(),
  }),
});

const PostsWithDataSchema = z.array(PostWithDataSchema);

export type PostsWithDataType = z.infer<typeof PostsWithDataSchema>;

export type PostWithDataType = z.infer<typeof PostWithDataSchema>;
