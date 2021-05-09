import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, useTheme, Avatar, Badge, Button, Flex } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { API_URL } from 'app/constants'
import { useCreatePost } from '@hooks'

const Post = ({ id, body, image, archived, fullName }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const [postId, setPostId] = useState(id)
  const theme = useTheme()
  const { mutateAsync, isLoading } = useMutation(() => {
    return fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
    })
  })
  const color = isDeleted ? theme.colors.red[500] : theme.colors.purple[500]
  const {
    mutateAsync: createPostAsync,
    isLoading: isCreatingPostLoading,
  } = useCreatePost({
    body,
    image,
    archived,
    fullName,
  })

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      m="2"
      boxShadow={`7px 8px 2px 0px ${color}`}
    >
      <Box p="6">
        <Flex m="4" justify="center">
          <Avatar size="2xl" name="Ryan Florence" src={image} />
        </Flex>
        <Flex>
          <Badge borderRadius="full" px="2" colorScheme="purple" mr="1">
            {fullName}
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="blue" mr="1">
            is archived: {`${archived}`}
          </Badge>
        </Flex>

        <Box>
          <Box as="span" fontSize="sm">
            {body}
          </Box>
        </Box>
        <Button
          m="1"
          isLoading={isLoading}
          bg="purple.900"
          disabled={isDeleted || isLoading}
          onClick={() => {
            mutateAsync().then(() => {
              // setPostsContext({
              //   ...postsContext,
              //   reFetch: !postsContext.reFetch,
              // })
              setIsDeleted(true)
            })
          }}
        >
          Delete
        </Button>
        <Button
          isLoading={isLoading}
          m="1"
          bg="purple.600"
          disabled={isDeleted || isLoading}
        >
          Edit
        </Button>
        {isDeleted && (
          <Button
            m="1"
            bg="cyan.600"
            onClick={() => {
              createPostAsync().then(({ id }) => {
                setPostId(id)
                setIsDeleted(false)
              })
            }}
            disabled={isCreatingPostLoading}
          >
            Undo
          </Button>
        )}
      </Box>
    </Flex>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
}

export default memo(Post)
