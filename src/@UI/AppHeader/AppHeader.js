import { memo, useState, useContext } from 'react'
import { Flex, Heading, Button, useToast } from '@chakra-ui/react'
import { PostsContext } from '@Context'

const AppHeader = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useContext(PostsContext)
  const toast = useToast()
  console.log({ posts, setPosts })
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
            setLoading(true)
            toast({
              title: 'Fetching posts data',
              description: 'please wait...',
              status: 'info',
              duration: 3000,
              isClosable: true,
              onCloseComplete() {
                setLoading(false)
                setPosts([1, 1, 1])
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
