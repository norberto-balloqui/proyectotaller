import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, useToast } from '@chakra-ui/react'
import {getMatriculas, delMatricula} from '../data/matricula'
import router from 'next/router'
import Swal from 'sweetalert2'

const matricula = () => {
  const [matriculas, setMatriculas] = state([{
    fecha: '',
    valor: '',
    abono: '',
    parvulo: '',
    apoderado: '',
    apoderado2: '',
    apoderado3: ''
   
  }])




  


    
  const deleteMatricula = (as) => {
    Swal.fire({
      title: 'Estas seguro de eliminar la Matricula?',
      text: "Si la borras no es posible recuperar la informacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        delMatricula(as._id).then(res => {
          Swal.fire(
            'Borrado!',
            'Se elimino con exito la matricula.',
            'success'
          )
        })
      }
    })
  }


const buscarApoderado = (apoderado) =>{

if(apoderado!=null){
  return apoderado.nombre
}else{
  return "    -     "
}


}

  const contentTable = () => {
    return matriculas.map((matricula => (
        <Tr key={matricula._id}>
          <Td>{matricula.fecha.substring(0,10)}</Td>
          <Td>{matricula.valor}</Td>
          <Td>{matricula.abono}</Td>
          <Td>{matricula.parvulo.nombre}</Td>
          <Td>{buscarApoderado(matricula.apoderado)}</Td>
          <Td>{buscarApoderado(matricula.apoderado2)}</Td>
          <Td>{buscarApoderado(matricula.apoderado3)}</Td>
          


          <Td>
            <Button colorScheme={"yellow"} mr="2" onClick={() => router.push(`./matricula/${matricula._id}`)}>
              Editar
            </Button>
            <Button colorScheme={"red"} onClick={() => deleteMatricula(matricula)} >
              Eliminar
            </Button>
          </Td>
        </Tr>
      )
    ))
  }

  effect(() => {
    getMatriculas().then(res =>{

      setMatriculas(res.data)
      
    })   
  }, [matriculas])


  return (
    <>
    <Container maxW="container.xl" my="40" >
      <Heading as="h1" size="2xl" textAlign="center" my={20}>Matricula</Heading>
      <Button colorScheme={"green"} mt="10" mb={10} onClick={() => router.replace('./registroMatricula')}>Agregar Matricula</Button>
      <Stack spacing={7}> 
        <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge'>
          <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr>
              <Td>fecha</Td>
              <Td>valor</Td>
              <Td>abono</Td>
              <Td>parvulo</Td>
              <Td>apoderado</Td>
              <Td>apoderado2</Td>
              <Td>apoderado3</Td>
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

export default matricula