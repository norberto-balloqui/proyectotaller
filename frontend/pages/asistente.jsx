import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Tbody, Td, Thead, Tr} from '@chakra-ui/react'
import {getAsistentes, delAsistente} from '../data/asistente'
import router from 'next/router'
import Swal from 'sweetalert2'

const asistente = () => {
  const [asistentes, setAsistentes] = state([{
    _id:'',
    rut:'',
    nombre: '',
    fecha_de_nac: '',
    direccion: '',
    telefono: '',
    correo: ''

  }])

  const deleteAsistente = (as) => {
    Swal.fire({
      title: 'Estas seguro de eliminar la asistente?',
      text: "Si la borras no es posible recuperar la informacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        delAsistente(as._id).then(res => {
          Swal.fire(
            'Borrado!',
            'Se elimino con exito la asistente.',
            'success'
          )
        })
      }
    })
  }

  

  const contentTable = () => {
    return asistentes.map((asistente => (
        <Tr key={asistente._id}>
          <Td>{asistente.rut}</Td>
          <Td>{asistente.nombre}</Td>
          <Td>{asistente.fecha_de_nac.substring(0,10)}</Td>
          <Td>{asistente.direccion}</Td>
          <Td>{asistente.telefono}</Td>
          <Td>{asistente.correo}</Td>
          <Td>
            <HStack>
              <Button colorScheme={"yellow"} mr="2" onClick={() => router.push(`./asistente/update/${asistente._id}`)}>
                Editar
              </Button>
              <Button colorScheme={"red"} onClick={() => deleteAsistente(asistente)} >
                Eliminar
              </Button>
            </HStack>
          </Td>
        </Tr>
      )
    ))
  }

  effect(() => {
    getAsistentes().then(res =>{
      setAsistentes(res.data)
    })
    
  }, [asistentes])

  return (
    <>
    <Container maxW="container.xl" >
      <Heading as="h1" size="2xl" textAlign="center" my={20}>Asistentes</Heading>
      <Button colorScheme={"whatsapp"} mt="10" mb={10} onClick={() => router.replace('./asistente/registro')}>Agregar asistente</Button>
      <Stack spacing={7}> 
        <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
          <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr>
              <Td>RUT</Td>
              <Td>Nombre</Td>
              <Td>Fecha de Nacimiento</Td>
              <Td>Direccion</Td>
              <Td>Telefono</Td>
              <Td>Correo Electronico</Td>
              <Td>Opciones</Td>
            </Tr>
          </Thead>
          <Tbody>
            {contentTable()}
          </Tbody>
        </Table>

      </Stack>
    </Container>

    </>
    
    
    
  )
}

export default asistente
