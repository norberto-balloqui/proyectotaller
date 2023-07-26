import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react'
import router from 'next/router'
import {VerApoderado, EliminarApoderado} from '../antmedico/apoderado'

import Swal from 'sweetalert2'

const apoderado = () => {
  const [apoderados, VerApoderados] = state([{

    _id:'',
    rut:'',
    nombre: '',
    fecha_de_nac: '',
    direccion: '',
    telefono1: '',
    telefono2: '',
    correo: ''

  }])

  const apoderadoeliminar= ( id) =>{
    EliminarApoderado(id)
    Swal.fire(
        {
          icon: 'success',
          title: 'Apoderado eliminado',
          showConfirmButton: true,
          text: 'Apoderado se elimino con exito'
        }).then(()=>{
          location.reload()
        })
}


  const body = () => {
    return apoderados.map((apoderado => (

        <Tr key={apoderado._id}>
          <Td>{apoderado.rut}</Td>
          <Td>{apoderado.nombre}</Td>
          <Td>{apoderado.fecha_de_nac.substring(0,10)}</Td>
          <Td>{apoderado.direccion}</Td>
          <Td>{apoderado.telefono1}</Td>
          <Td>{apoderado.telefono2}</Td>
          <Td>{apoderado.correo}</Td>

          <Td>   
          <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>apoderadoeliminar(apoderado._id)}>Eliminar</Button>
          </Td>
        </Tr>
      )
    ))
  }
  effect(() => {
    VerApoderado().then(res =>{
      VerApoderados(res.data)
    })
  }, [])



  return (
    <>
  <Container maxW='container.xl' my="35">
  <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Apoderados</Heading>
  <Stack spacing={'5'} mt='15'>
  <b/> <b/> 

  <HStack maxW={'full'} alignItems='center'>
 
 <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./apoderadocrear")}>Agregar apoderado</Button>
 <b/> <b/> 
 <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={()=>router.push("/")}>Volver</Button>
 
 </HStack>

 <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
        <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr fontSize={'25'}>
              <Td>RUT</Td>
              <Td>Nombre</Td>
              <Td>Fecha de Nacimiento</Td>
              <Td>Dirección</Td>
              <Td>Teléfono1</Td>
              <Td>Teléfono2</Td>
              <Td>Correo Electronico</Td>
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
export default apoderado