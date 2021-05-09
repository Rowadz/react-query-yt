import { useMutation } from 'react-query'
import { useToast } from '@chakra-ui/react'
import { API_URL } from 'app/constants'

const useCreatePost = (data) => {
  const toast = useToast()
  const mutation = useMutation(
    () => {
      return fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    },
    {
      mutationKey: 'creatingPost',
      onMutate() {
        toast({
          title: 'Creating your post',
          description: 'please wait...',
          status: 'info',
        })
      },
      onSuccess() {
        toast.closeAll()
        toast({
          title: 'Done!',
          description: 'Your post have been created',
          status: 'success',
          duration: 1000,
        })
      },
    }
  )
  return mutation
}

export default useCreatePost
