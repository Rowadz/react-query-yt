import { memo } from 'react'
import { Box, useTheme, Avatar, Badge, Button, Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Post = ({ body, image, archived, fullName }) => {
  const theme = useTheme()
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      m="2"
      boxShadow={`7px 8px 2px 0px ${theme.colors.purple[500]}`}
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
        <Button m="1" bg="purple.900">
          Delete
        </Button>
        <Button m="1" bg="purple.600">
          Edit
        </Button>
      </Box>
    </Flex>
  )
}

Post.propTypes = {
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
}

export default memo(Post)
