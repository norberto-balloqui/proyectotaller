import React from 'react'
import { Box, Text, ChakraProvider } from "@chakra-ui/react"

const BackgroundImage = () => {
  return (
    <ChakraProvider>
      <Box
        w="100%"
        h="800px"

        zIndex="-1"
        pos="absolute"
        bg="rgba(200,0,0,0.1)"
        _before={{
          content: '""',
          bgImage:
            "url(https://comiqueros.cl/wp-content/uploads/2021/02/Castillo-ambulante.jpg)",
          bgSize: "cover",
          
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: 0.165
        }}
      >
        <Text color="white">I am not faded!</Text>
      </Box>
    </ChakraProvider>
  )
}

export default BackgroundImage