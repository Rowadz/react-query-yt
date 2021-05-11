import React, { useRef, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import {
  Button,
  Drawer,
  Input,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { API_URL } from 'app/constants'

const Login = () => {
  const [state, setState] = useState({ email: '', password: '' })
  const [accessToken, setAccessToken] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutateAsync } = useMutation(() => {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    }).then((res) => res.json())
  })

  const btnRef = useRef()

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }
  }, [accessToken])

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} ml="1" mr="1">
        Login
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Login</DrawerHeader>

          <DrawerBody>
            <Input
              type="email"
              placeholder="email"
              onChange={({ target: { value } }) => {
                setState({ ...state, email: value })
              }}
            />
            <Input
              mt="3"
              type="password"
              placeholder="password"
              onChange={({ target: { value } }) => {
                setState({ ...state, password: value })
              }}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => {
                mutateAsync().then(({ accessToken }) => {
                  setAccessToken(accessToken)
                })
              }}
            >
              Login
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Login
