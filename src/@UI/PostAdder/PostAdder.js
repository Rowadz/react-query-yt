import React, { useRef, useState } from 'react'
import { useMutation } from 'react-query'
import {
  useToast,
  Button,
  Drawer,
  Input,
  Textarea,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { API_URL } from 'app/constants'

const PostAdder = () => {
  const [state, setState] = useState({ fullName: '', body: '' })
  const {
    data,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    mutate,
    mutateAsync,
    status,
  } = useMutation(
    () => {
      return fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })
    },
    {
      mutationKey: 'creatingPost',
      onMutate() {
        toast({
          title: 'Creating your post',
          description: 'please wait...',
          status: 'info',
        })
      },
      onSuccess() {
        toast.closeAll()
        toast({
          title: 'Done!',
          description: 'Your post have been created',
          status: 'success',
          duration: 1000,
        })
      },
    }
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const toast = useToast()

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Create Post
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input
              placeholder="Full Name"
              value={state.fullName}
              onChange={({ target: { value } }) => {
                setState({ ...state, fullName: value })
              }}
            />
            <Textarea
              mt={4}
              placeholder="body"
              value={state.body}
              onChange={({ target: { value } }) => {
                setState({ ...state, body: value })
              }}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => {
                // mutate()
                // mutateAsync().then(() => {}).catch(() => {}).finally(() => {})
                mutateAsync()
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default PostAdder
