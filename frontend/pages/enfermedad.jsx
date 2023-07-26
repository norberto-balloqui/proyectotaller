import React, { useEffect as effect, useState as state }  from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react'
import router from 'next/router'
import {VerEnfermedad, EliminarEnfermedad} from '../antmedico/enfermedad'
import Swal from 'sweetalert2'

const enfermedad = () => {
  const [enfermedades, VerEnfermedades] = state([{
    _id:'',
    nombre: ''
  }])

  const enfermedadeliminar= ( id) =>{
    EliminarEnfermedad(id)
    Swal.fire(
        {
          icon: 'success',
          title: 'Enfermedad eliminada',
          showConfirmButton: true,
          text: 'Antecedente se eliminó con éxito'
        }).then(()=>{
          location.reload()
        })
}





  const body = () => {
    return enfermedades.map((enfermedad=> (
        <Tr key={enfermedad._id}>
          <Td>{enfermedad.nombre}</Td>

          <Td>
          <HStack>
          <Button size="md" colorScheme="red" textColor={"white"} onClick={()=>enfermedadeliminar(enfermedad._id)}>Eliminar</Button>
          </HStack>
          </Td>

        </Tr>
      )
    ))
  }
  effect(() => {
    VerEnfermedad().then(res =>{
      VerEnfermedades(res.data)
    })
  }, [])



  return (
    <>
    <Container maxW='container.lg' my="35">
  <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Enfermedades</Heading>
  <Stack spacing={'5'} mt='15'>
  <b/> <b/> 

  <HStack maxW={'full'} alignItems='center'>
 
 <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./enfermedadcrear")}>Agregar enfermedad</Button>
 <b/> <b/> 
 <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={()=>router.push("/")}>Volver</Button>
 
 </HStack>

 <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
        <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr fontSize={'25'}>
              <Td>Nombre</Td>
              <Td>Opciones</Td>
            </Tr>
          </Thead>
          <Tbody>
            {body()}
          </Tbody>
        </Table>

      </Stack>
    </Container>
    </>   
  )
}
export default enfermedad