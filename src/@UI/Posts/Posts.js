import { memo, useContext } from 'react'
import { Flex } from '@chakra-ui/react'
import { PostsContext } from '@Context'
import { Post } from './components'

const Posts = () => {
  const [posts] = useContext(PostsContext)
  if (!posts.length) {
    return null
  }
  return (
    <Flex flexDirection={['column', 'column', 'column', 'row']}>
      {posts.map((post, i) => (
        <Post key={i} />
      ))}
    </Flex>
  )
}

export default memo(Posts)
