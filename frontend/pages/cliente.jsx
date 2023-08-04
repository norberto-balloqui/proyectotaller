
import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react'
import router from 'next/router'
import { VerCliente, EliminarCliente } from '../antmedico/cliente'
import Swal from 'sweetalert2'

const cliente = () => {
  const [clientes, VerClientes] = state([{

    _id:'',
    rut:'',
    nombre: '',
    direccion: '',
    telefono: '',
    notificacion: ''
  }])

  const clienteEliminar = (id) =>{
    EliminarCliente(id)
    Swal.fire({
      icon: 'success',
      title: 'Cliente eliminado',
      showConfirmButton: true,
      text: 'Cliente se eliminó con éxito'
    }).then(()=>{
      window.location.reload()
    })
  }

  const body = () => {
    return clientes.map((cliente => (
        <Tr key={cliente._id}>        
          <Td>{cliente.rut}</Td>
          <Td>{cliente.nombre}</Td>
          <Td>{cliente.direccion}</Td>
          <Td>{cliente.telefono}</Td>
          <Td>{cliente.notificacion.nombre}</Td>
          <Td>
            <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>clienteEliminar(cliente._id)}>Eliminar</Button>
          </Td>
        </Tr>
      )
    ))
  }

  effect(() => {
    VerCliente().then(res =>{
      VerClientes(res.data)
    })
  }, [])

  return (
    <>
  <Container maxW='container.xl' my="40">
  <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Antecedentes Medicos</Heading>
  <Stack spacing={'5'} mt='15'>
  <b/> <b/> 

  <HStack maxW={'full'} alignItems='center'>
 
  <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./clienteCrear")}>Agregar Cliente</Button>
  <b/> <b/> 
  <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={()=>router.push("/")}>Volver</Button>
  
  </HStack>

  <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
        <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr fontSize={'25'}>

              <Td>RUT</Td>
              <Td>NOMBRE</Td>
              <Td>DIRECCIÓN</Td>
              <Td>TELÉFONO</Td>
              <Td>NOTIFICACIÓN WHATSAPP</Td>

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
export default cliente;
