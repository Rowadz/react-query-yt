import React from 'react'
import { useContext } from 'react'
import { Grid, Button, Flex } from '@chakra-ui/react'
import { PostsContext } from '@Context'
import Observer from '@researchgate/react-intersection-observer'
import { Post } from './components'

const Posts = () => {
  const [postsContext, setPostsContext] = useContext(PostsContext)

  if (!postsContext.data.length) {
    return null
  }
  return (
    <Grid
      gap={6}
      templateColumns="repeat(3, 1fr)"
      flexDirection={['column', 'column', 'column', 'row']}
      display={['flex', 'flex', 'flex', 'grid']}
    >
      {postsContext.data.map((post, i) => (
        <Post
          key={i}
          id={post.id}
          body={post.body}
          image={post.image}
          fullName={post.fullName}
          archived={post.archived}
        />
      ))}
      <Observer
        onChange={({ isIntersecting }) => {
          if (isIntersecting) {
            setPostsContext({ ...postsContext, page: postsContext.page + 1 })
          }
        }}
      >
        <Flex justify="center" align="center" bg="purple.500" />
      </Observer>
    </Grid>
  )
}

export default Posts
