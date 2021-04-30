import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { AppHeader, Posts } from '@UI'
import { PostsContextProvider } from '@Context'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <PostsContextProvider>
          <AppHeader />
          <Posts />
        </PostsContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
