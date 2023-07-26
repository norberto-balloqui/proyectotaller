import { Container, Stack, Button, Heading, Table, Thead, Tr, Td, Tbody, HStack} from '@chakra-ui/react'
import React, { useEffect as effect, useState as state } from 'react'
import router from 'next/router'
import {getAsistencias, delAsistencia} from '../data/asistencia'
import Swal from 'sweetalert2'

const asistencia = () => {
    const [asistencias, setAsistencias] = state([{
      _id:'',
      titulo:'',
      comentario: '',
      fecha: '',
      asistente_d: ''
    }])

    const deleteAsistencia = (as) => {
      Swal.fire({
        title: 'Estas seguro de eliminar la asistencia?',
        text: "Si la borras no es posible recuperarla",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          delAsistencia(as._id).then(res => {
            Swal.fire(
              'Borrado!',
              'Se elimino con exito la asistencia.',
              'success'
            )
          })
        }
      })
    }

    const statusAsistente = (asistencia) => {
      if(asistencia.asistente_d != null){
        return (asistencia.asistente_d.nombre)
      }else {
        return ("La asistente no se encuentra en el sistema")
      }
    }

    const contentTable = () => {
      return asistencias.map((asistencia => (
        <Tr key={asistencia._id}>
          <Td>{asistencia.titulo}</Td>
          <Td>{asistencia.comentario}</Td>
          <Td>{asistencia.fecha.substring(0,10)}</Td>
          <Td>{statusAsistente(asistencia)}</Td>
          <Td>
            <HStack>
              <Button colorScheme={"telegram"} onClick={() => router.push(`./asistencia/view/${asistencia._id}`)}>
                Asistencia
              </Button>
              <Button colorScheme={"yellow"} onClick={() => router.push(`./asistencia/update/${asistencia._id}`)}>
                Editar
              </Button>
              <Button colorScheme={"red"} onClick={() => deleteAsistencia(asistencia)}>
                Eliminar
              </Button>
            </HStack>
          </Td>
        </Tr>
      )
      ))
      
    }

    effect(() => {
      getAsistencias().then(res => {
        setAsistencias(res.data.asistencia)
      })

    }, [asistencias])

  return (
    <>
    <Container maxW={"container.xl"}>
        <Heading as="h1" size="2xl" textAlign="center" my={20}>Asistencia de la Sala Cuna</Heading>
        <Button colorScheme="whatsapp" mb={10} onClick={() => router.push('./asistencia/registro') }>Agregar asistencia</Button>
        <Stack spacing={5}>
          <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
            <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
              <Tr>
                <Td>Titulo</Td>
                <Td>Comentario</Td>
                <Td>Fecha</Td>
                <Td>Asistente</Td>
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

export default asistencia