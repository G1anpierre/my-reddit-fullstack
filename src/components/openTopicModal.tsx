'use client'
import React from 'react'
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
} from '@nextui-org/react'
import {createTopic} from '@/actions'
import {useFormState} from 'react-dom'
import {SubmitButton} from './submitButton'

const initialState = {
  message: {
    name: [],
    description: [],
    _form: [],
  },
}
export const OpenTopicModal = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const [state, action] = useFormState(createTopic, initialState)

  return (
    <>
      <Button onPress={onOpen} fullWidth>
        Create a Topic
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a topic
              </ModalHeader>
              <ModalBody>
                <form action={action} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    isInvalid={!!state.message.name?.length}
                    errorMessage={state.message?.name?.join(' ')}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter your description"
                    name="description"
                    isInvalid={!!state.message.description?.length}
                    errorMessage={state.message?.description?.join(' ')}
                  />
                  {!!state.message._form?.length && (
                    <div className="text-red-500">
                      {state.message._form?.join(' ')}
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
  )
}
