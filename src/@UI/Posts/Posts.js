import { memo, useContext } from 'react'
import { Grid } from '@chakra-ui/react'
import { PostsContext } from '@Context'
import { Post } from './components'

const Posts = () => {
  const [posts] = useContext(PostsContext)
  if (!posts.length) {
    return null
  }
  return (
    <Grid
      gap={6}
      templateColumns="repeat(3, 1fr)"
      flexDirection={['column', 'column', 'column', 'row']}
      display={['flex', 'flex', 'flex', 'grid']}
    >
      {posts.map((post, i) => (
        <Post key={i} />
      ))}
    </Grid>
  )
}

export default memo(Posts)
