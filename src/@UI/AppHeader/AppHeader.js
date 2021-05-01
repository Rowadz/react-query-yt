import { memo, useState, useContext, useEffect } from 'react'
import { Flex, Heading, Button, useToast } from '@chakra-ui/react'
import { PostsContext } from '@Context'
import { API_URL } from '@constants'
import { useQuery } from 'react-query'

const AppHeader = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useContext(PostsContext)
  const toast = useToast()
  const fetchData = () => {}

  const { isLoading, error, data, refetch: fetchPosts } = useQuery(
    'repoData',
    () => fetch(`${API_URL}/posts`).then((res) => res.json()),
    { enabled: false }
  )

  useEffect(() => {
    if (data) {
      // setPosts(data)
    }
  }, [data])

  console.log(isLoading, error, data)

  return (
    <Flex as="nav" flex="1" mb={4} padding="0.5rem" bg="purple.700">
      <Flex align="center">
        <Heading size="md">React Query</Heading>
      </Flex>
      <Flex flexGrow={1} />
      <Flex>
        <Button
          bg="inherit"
          isLoading={loading}
          onClick={() => {
            fetchPosts()
            setLoading(true)
            toast({
              title: 'Fetching posts data',
              description: 'please wait...',
              status: 'info',
              duration: 3000,
              isClosable: true,
              onCloseComplete() {
                setLoading(false)
                setPosts([1, 1, 1, 1, 1, 1])
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
