import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, useToast } from '@chakra-ui/react'
import {getParvulos, delParvulo} from '../data/parvulo'
import router from 'next/router'
import Swal from 'sweetalert2'

const parvulo = () => {
  const [parvulos, setParvulos] = state([{
    
    _id:'',
    rut:'',
    nombre: '',
    fecha_de_nac:'',
    grado: ''
  }])


    
  const deleteParvulo = (as) => {
    Swal.fire({
      title: 'Estas seguro de eliminar el parvulo?',
      text: "Si la borras no es posible recuperar la informacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        delParvulo(as._id).then(res => {
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
    return parvulos.map((parvulo => (
        <Tr key={parvulo._id}>
          <Td>{parvulo.rut}</Td>
          <Td>{parvulo.nombre}</Td>
          <Td>{parvulo.fecha_de_nac.substring(0,10)}</Td>
          <Td>{parvulo.grado.grado}</Td>

          <Td>
            <Button colorScheme={"yellow"} mr="2" onClick={() => router.push(`./Parvulo/update/${parvulo._id}`)}>
              Editar
            </Button>
            <Button colorScheme={"red"} onClick={() => deleteParvulo(parvulo)} >
              Eliminar
            </Button>
          </Td>
        </Tr>
      )
    ))
  }




  effect(() => {
    getParvulos().then(res =>{

      setParvulos(res.data)

  
      
    })   
  }, [parvulos])

  return (
    <>
    <Container maxW="container.xl" my="40">
      <Heading as="h1" size="2xl" textAlign="center" my={20}>Parvulo</Heading>
      <Button colorScheme={"green"} mt="10" mb={10} onClick={() => router.replace('./registroParvulo')}>Agregar parvulo</Button>
      <Stack spacing={7}> 
        <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge'>
          <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr>
              <Td>RUT</Td>
              <Td>Nombre</Td>
              <Td>Fecha de Nacimiento</Td>
              <Td>Grado</Td>
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

export default parvulo