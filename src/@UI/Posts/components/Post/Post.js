import { memo } from 'react'
import { Box, useTheme, Avatar, Badge, Button, Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Post = ({ id, body, image, archived, fullName }) => {
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
          <Avatar
            size="2xl"
            name="Ryan Florence"
            src="https://bit.ly/ryan-florence"
          />
        </Flex>
        <Flex alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="purple" mr="1">
            Name
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="blue" mr="1">
            is archived: False
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Flex>

        <Box>
          <Box as="span" color="white" fontSize="sm">
            bodyLorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum pretium congue convallis. Donec commodo sagittis
            ullamcorper. Sed tinciduntis sagittis. Suspendisse id egestas sem,
            id ullamcorper leo.
          </Box>
        </Box>
        <Button m="1" bg="purple.900">Delete</Button>
        <Button m="1" bg="purple.600">Edit</Button>
      </Box>
    </Flex>
  )
}

Post.propTypes = {
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  archived: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default memo(Post)
