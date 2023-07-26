import React, { useEffect, useState } from 'react'
import { Button, Container, Heading, Stack, Select, Table, Tbody, Td, Thead, Tr, FormControl, FormLabel, Input, Textarea, HStack} from '@chakra-ui/react'

import router from 'next/router'

import {CrearEnfermedad} from '../antmedico/enfermedad'

import Swal from 'sweetalert2'  


const EnfermedadCrear = () => {

  


  const [enfermedad, EnfermedadVer] = useState({
    _id:'',
    nombre: ''
  })


  const handlechange = (e) =>{
    EnfermedadVer({
      ...enfermedad,
      [e.target.name]: e.target.value
    })
  }

  const enfermedadcrear = async (e) =>{
    e.preventDefault()

    console.log(enfermedad)

    const response = await CrearEnfermedad(enfermedad)
      if(response.status == 200){
        Swal.fire(
          {
            icon: 'success',
            title: 'Enfermedad guardada',
            showConfirmButton: true,
            text: 'Enfermedad se guardo con exito'
          }).then(() =>{
            router.push('./enfermedad')
          })
      }else{
        Swal.fire(
          {
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            text: 'Enfermead no se guardo'
          }
        )
      }
  }


  return (
    <>
    <Container maxW="container.sm" my='40'>
      <Stack spacing={5} my={'30'}>
        <Heading as='h1' size={'2xl'} align='center' textColor={'Black'}>Registrar enfermedad</Heading>
        <Container maxW='container.lg' marginTop={'40'}>
          <Stack spacing={8}>
          <b/> 
            
                         
            <FormControl id="nombre">
              <FormLabel>Ingrese una enfermedad</FormLabel>
              <Input variant='filled' onChange={handlechange} name='nombre' placeholder='Enfermedad' />
            </FormControl>

          </Stack>
          <HStack maxW={'full'} alignItems='center'>
            <Button colorScheme='green' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' onClick={enfermedadcrear}>Guardar</Button>
            <Button colorScheme='yellow' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('./enfermedad')}>Volver</Button>
          </HStack>
        </Container>
      </Stack>
    </Container>
    </>
  )
}
export default EnfermedadCrear