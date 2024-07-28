"use client";
import { likePost } from "@/actions/like-post";
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

export const LikeButton = ({ post }: { post: any }) => {
  const auth = useSession();

  const initialState = {
    errors: {
      title: [],
      content: [],
      _form: [],
    },
  };

  const isLiked = post.likes?.some(
    (like: any) => like.userId === auth.data?.user?.id
  );

  const [formState, action] = useFormState(
    likePost.bind(null, { postId: post.id }),
    initialState
  );

  return (
    <div className="text-xs text-gray-400 flex gap-2">
      <form action={action} className="flex gap-2">
        <Button size="sm" isIconOnly type="submit">
          <HeartIcon size={16} color={isLiked ? "red" : "white"} />
        </Button>
        <CountLike post={post} />
      </form>
    </div>
  );
};

export const CountLike = ({ post }: { post: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usernames, setUsernames] = useState<
    { id: string; user: { name: string; id: string; image: string } }[]
  >([]);

  useEffect(() => {
    const getUserLikes = async () => {
      try {
        const response = await fetch(`/api/user-like-posts?postId=${post.id}`);
        const data = await response.json();
        setUsernames(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen) {
      getUserLikes();
    }
  }, [isOpen, post.id]);

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
                {usernames.map((username, index) => (
                  <div key={username.id} className="flex gap-2">
                    <Avatar
                      src={username.user.image}
                      className="w-6 h-6 text-tiny"
                    />
                    <p>{username.user.name}</p>
                  </div>
                ))}
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
