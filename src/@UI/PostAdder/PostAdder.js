import React, { useRef, useState } from 'react'
import {
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
import { useCreatePost } from '@hooks'

const PostAdder = () => {
  const [state, setState] = useState({ fullName: '', body: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutateAsync } = useCreatePost(state)
  const btnRef = useRef()

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
