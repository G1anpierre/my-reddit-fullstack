"use client";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { HeartIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PostWithDataType } from "@/schema";

type ActionFn = (
  prevState: { success: boolean; error: string | null },
  formData: FormData
) => Promise<any>;

export const LikeButton = ({
  post,
  actionFn,
  type,
}: {
  post: PostWithDataType;
  actionFn: ActionFn;
  type: "post" | "comment";
}) => {
  const auth = useSession();

  const initialState = {
    errors: {
      title: [],
      content: [],
      _form: [],
    },
  };
  const fetchUrlToGetUserLikes =
    type === "post"
      ? `/api/user-like-posts?postId=${post.id}`
      : `/api/user-like-comments?commentId=${post.id}`;

  const isLiked = post.likes?.some(
    (like) => like.userId === auth.data?.user?.id
  );

  const [formState, action] = useFormState(actionFn, initialState);

  return (
    <div className="text-xs text-gray-400 flex gap-2">
      <form action={action} className="flex gap-2">
        <Button size="sm" isIconOnly type="submit">
          <HeartIcon size={16} color={isLiked ? "red" : "white"} />
        </Button>
        <CountLike post={post} url={fetchUrlToGetUserLikes} />
      </form>
    </div>
  );
};

export const CountLike = ({
  post,
  url,
}: {
  post: PostWithDataType;
  url: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usernames, setUsernames] = useState<
    { id: string; user: { name: string; id: string; image: string } }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the users who liked the post when the modal is open
  useEffect(() => {
    const getUserLikes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsernames(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      getUserLikes();
    }
  }, [isOpen, post.id, url]);

  return (
    <>
      <Button size="sm" onPress={onOpen} type="button">
        {post.likes?.length} Like
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Likes Reactions to this post
              </ModalHeader>
              <ModalBody>
                {isLoading && (
                  <p className="text-center text-gray-500 py-4">Loading...</p>
                )}
                {usernames.map((username, index) => (
                  <div key={username.id} className="flex gap-2">
                    <Avatar
                      src={username.user.image}
                      className="w-6 h-6 text-tiny"
                    />
                    <p>{username.user.name}</p>
                  </div>
                ))}
                {usernames.length === 0 && !isLoading && (
                  <p className="text-center text-gray-500 py-4">No likes yet</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
