import { memo, useContext } from 'react'
import { PostsContext } from '@Context'

const Posts = () => {
  const [posts] = useContext(PostsContext)
  if (!posts.length) {
    return null
  }
  return <div></div>
}

export default memo(Posts)
