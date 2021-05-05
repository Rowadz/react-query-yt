import { useState, useEffect, useContext } from 'react'
import { Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { PostsContext } from '@Context'
import { useQuery } from 'react-query'
import { API_URL } from 'app/constants'

const AppHeader = () => {
  const [enabled, setEnabled] = useState(false)
  const [postsContext, setPostsContext] = useContext(PostsContext)
  console.log({ postsContext })
  const toast = useToast()
  const { isLoading, isFetching, data } = useQuery(
    ['fetchPosts', postsContext.page],
    ({ queryKey }) => {
      const [, page] = queryKey
      console.log(queryKey)
      return fetch(`${API_URL}/posts?_limit=10&_page=${page}`)
        .then((res) => res.json())
        .finally(() => setEnabled(false))
    }
    // { keepPreviousData: false }
    // { enabled: true }
    // { refetchInterval: 1000 }
  )

  useEffect(() => {
    if (data) {
      setPostsContext({
        ...postsContext,
        // data,
        data: [...postsContext.data, ...data],
      })
    }
  }, [data, setPostsContext])

  useEffect(() => {
    if (isLoading || isFetching) {
      toast({
        title: 'Fetching posts data',
        description: 'please wait...',
        status: 'info',
        duration: 3000,
        onCloseComplete() {
          // setEnabled(false)
        },
      })
    }
  }, [isLoading, isFetching])

  return (
    <Flex as="nav" flex="1" mb="4" padding="0.5rem" bg="purple.700">
      <Flex align="center">
        <Heading size="md">React Query</Heading>
      </Flex>
      <Flex flexGrow="1" />
      <Flex>
        <Button
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
