import { useState, createContext } from 'react'

export const PostsContext = createContext()

const Provider = ({ children }) => {
  const [postsContext, setPostsContext] = useState({
    data: [],
    page: 1,
    loading: false,
  })

  return (
    <PostsContext.Provider value={[postsContext, setPostsContext]}>
      {children}
    </PostsContext.Provider>
  )
}

export default Provider
