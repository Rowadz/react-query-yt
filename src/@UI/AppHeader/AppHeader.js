import { useState, useEffect, useContext } from 'react'
import { Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { PostsContext } from '@Context'
import { useQuery } from 'react-query'
import { API_URL } from 'app/constants'
import axios from 'axios'
import { PostAdder, Login } from '@UI'

const AppHeader = () => {
  const [enabled, setEnabled] = useState(false)
  const [postsContext, setPostsContext] = useContext(PostsContext)
  const toast = useToast()
  const { isLoading, isFetching, data } = useQuery(
    ['fetchPosts', postsContext.page],
    // ['fetchPosts', postsContext.page, postsContext.reFetch],
    async ({ queryKey }) => {
      const [, page] = queryKey
      const response = await fetch(
        `${API_URL}/posts?_limit=10&_page=${page}`
      ).finally(() => setEnabled(false))

      if (response.status === 401) {
        throw new Error('User not authenticated')
      }
      return response.json()
    },
    {
      refetchOnWindowFocus: false,
      onError(error) {
        toast({
          title: error.message,
          status: 'error',
          duration: 2000,
        })
      },
    }
    // { keepPreviousData: false }
    // { enabled: true }
    // { refetchInterval: 1000 }
  )

  useEffect(() => {
    if (data) {
      setPostsContext((prev) => ({
        ...prev,
        // data,
        data: [...prev.data, ...data],
      }))
    }
  }, [data, setPostsContext])

  useEffect(() => {
    if (isLoading || isFetching) {
      setPostsContext((prev) => ({ ...prev, loading: true }))
      toast({
        title: 'Fetching posts data',
        description: 'please wait...',
        status: 'info',
        duration: 2000,
      })
    } else {
      setPostsContext((prev) => ({ ...prev, loading: false }))
    }
  }, [isLoading, isFetching])

  return (
    <Flex as="nav" flex="1" mb="4" padding="0.5rem" bg="purple.700">
      <Flex align="center">
        <Heading size="md">React Query</Heading>
      </Flex>
      <Flex flexGrow="1" />
      <Flex>
        <Login />
        <PostAdder />
        <Button
          ml="1"
          mr="1"
          isLoading={isLoading || isFetching}
          bg="inherit"
          onClick={() => {
            setEnabled(true)
          }}
        >
          Fetch Posts
        </Button>
      </Flex>
    </Flex>
  )
}

export default AppHeader
