import { useState, createContext } from 'react'

export const PostsContext = createContext([])

const Provider = ({ children }) => {
  const [posts, setPosts] = useState([])

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {children}
    </PostsContext.Provider>
  )
}

export default Provider
