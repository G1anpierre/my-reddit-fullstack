"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { createPost } from "@/actions";
import { useFormState } from "react-dom";
// import { useActionState } from "react";
import { SubmitButton } from "./submitButton";

const initialState = {
  errors: {
    title: [],
    content: [],
    _form: [],
  },
};

export const OpenPostModal = ({ topic }: { topic: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, action] = useFormState(
    createPost.bind(null, topic),
    initialState
  );
  return (
    <>
      <Button onPress={onOpen} fullWidth>
        Create a Post
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a Post
              </ModalHeader>
              <ModalBody>
                <form action={action} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    label="Title"
                    name="title"
                    isInvalid={!!state.errors.title?.length}
                    errorMessage={state.errors?.title?.join(" ")}
                  />
                  <Textarea
                    label="Content"
                    placeholder="Enter your content"
                    name="content"
                    isInvalid={!!state.errors.content?.length}
                    errorMessage={state.errors?.content?.join(" ")}
                  />
                  {!!state.errors._form?.length && (
                    <div className="text-red-500">
                      {state.errors._form?.join(" ")}
                    </div>
                  )}
                  <SubmitButton />
                </form>
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
