import { memo, useState, useContext, useEffect } from 'react'
import { Flex, Heading, Button, useToast } from '@chakra-ui/react'
import { PostsContext } from '@Context'
import { API_URL } from '@constants'
import { useQuery } from 'react-query'

const AppHeader = () => {
  const [enableFetchingPosts, setEnabled] = useState(false)
  const [, setPosts] = useContext(PostsContext)
  const toast = useToast()

  const { isLoading, data, isFetching } = useQuery(
    'fetchingPosts',
    () => fetch(`${API_URL}/posts?_limit=10&_page=1`).then((res) => res.json()),
    { enabled: enableFetchingPosts }
    // { refetchInterval: 1000 }
  )

  console.log({ isLoading, data, isFetching })
  useEffect(() => {
    if (data) {
      setPosts(data)
    }
  }, [data, setPosts])

  return (
    <Flex as="nav" flex="1" mb={4} padding="0.5rem" bg="purple.700">
      <Flex align="center">
        <Heading size="md">React Query</Heading>
      </Flex>
      <Flex flexGrow={1} />
      <Flex>
        <Button
          bg="inherit"
          isLoading={isLoading || isFetching}
          onClick={() => {
            setEnabled(true)
            toast({
              title: 'Fetching posts data',
              description: 'please wait...',
              status: 'info',
              duration: 3000,
              isClosable: true,
              onCloseComplete() {
                setEnabled(false)
              },
            })
          }}
        >
          Fetch Posts
        </Button>
      </Flex>
    </Flex>
  )
}

export default memo(AppHeader)
