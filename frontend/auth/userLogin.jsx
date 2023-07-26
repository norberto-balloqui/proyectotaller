import { Container, FormControl, FormLabel, Heading, Input, Stack, Button, HStack, useToast, ChakraProvider } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalExp from '../components/ModalExp'
import {loginAsistente} from '../data/user'
import {useRouter} from 'next/router'

const userLogin = () => {
  const toast = useToast()
  const router = useRouter()
  const [rut, setRut] = useState('')
  const [rut2, setRut2] = useState('')
  const [rut3, setRut3] = useState('')

  const handleChange = (e) => {
    setRut(e.target.value)
    setRut2(e.target.value)
    setRut3(e.target.value)
  }

  const login = (e) => {
    e.preventDefault()
    console.log("Educadora: ", rut)
  }

  const login2 = (e) => {
    e.preventDefault()
    loginAsistente(rut2).then(res => {
      if(res.status == 200){
        toast({
          title: "Te has logeado con exito",
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      }else {
        router.reload()
      }
    })
    
  }
  const login3 = (e) => {
    e.preventDefault()
    console.log("Apoderado: ", rut3)
  }


  return (
    <>
    <Container maxW={"container.sm"} centerContent backgroundColor="blackAlpha.400" mt="10" borderRadius="10" >
      <Heading as="h1"  textAlign="center" mt={10} mb={30}>Bienvenidos a la Sala Cuna</Heading>

      <HStack>
        <ModalExp header={"Login"} button="Educadora" color="blue" body={
          <Stack>
            <FormControl>
              <FormLabel>RUT</FormLabel>
              <Input onChange={handleChange}/>
            </FormControl>
            <Button colorScheme="green" onClick={login}>Ingresar</Button>
          </Stack>
        }/>

      <ModalExp header={"Login"} button="Asistente" color="yellow" body={
          <Stack>
            <FormControl>
              <FormLabel>RUT</FormLabel>
              <Input onChange={handleChange}/>
            </FormControl>
            <Button colorScheme="green" onClick={login2}>Ingresar</Button>
          </Stack>
        }/>

      <ModalExp header={"Login"} button="Apoderado" color="green" body={
          <Stack>
            <FormControl>
              <FormLabel>RUT</FormLabel>
              <Input onChange={handleChange}/>
            </FormControl>
            <Button colorScheme="green" onClick={login3}>Ingresar</Button>
          </Stack>
        }/>
      </HStack>
    </Container>
    </>
    
    
    
  )
}

export default userLogin