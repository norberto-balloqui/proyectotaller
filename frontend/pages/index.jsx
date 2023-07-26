import { Container, Heading} from '@chakra-ui/react'
import React from 'react'

const index = () => {


  return (
    <>
    <Container maxW={"container.sm"} centerContent backgroundColor="blackAlpha.400" mt="10" borderRadius="10" >
      <Heading as="h1"  textAlign="center" mt={10} mb={30}>Bienvenidos a la Sala Cuna</Heading>


    </Container>
    </>
  )
}

export default index