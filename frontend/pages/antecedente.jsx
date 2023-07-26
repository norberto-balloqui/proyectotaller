import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react'
import router from 'next/router'
import {VerAntecedente, EliminarAntecedente} from '../antmedico/antecedente'
import Swal from 'sweetalert2'

const antecedente = () => {
  const [antecedentes, VerAntecedentes] = state([{
   
    _id:'',
    parvulo:'',
    discapacidad: '',
    enfermedad: '',
    cuidado: ''

  }])

  const antecedenteeliminar= ( id) =>{
    EliminarAntecedente(id)
    Swal.fire(
        {
          icon: 'success',
          title: 'Antecedente eliminado',
          showConfirmButton: true,
          text: 'Antecedente se elimino con exito'
        }).then(()=>{
          location.reload()
        })
}


  const body = () => {
    return antecedentes.map((antecedente => (

        <Tr key={antecedente._id}>

          <Td>{antecedente.parvulo.nombre}</Td>
          <Td>{antecedente.discapacidad.nombre}</Td>
          <Td>{antecedente.enfermedad.nombre}</Td>
          <Td>{antecedente.cuidado}</Td>
          <Td>
          <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>antecedenteeliminar(antecedente._id)}>Eliminar</Button>
          </Td>

        </Tr>
      )
    ))
  }
  effect(() => {
    VerAntecedente().then(res =>{
      VerAntecedentes(res.data)
    })
  }, [])



  return (
    <>
  <Container maxW='container.xl' my="40">
  <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Antecedentes Medicos</Heading>
  <Stack spacing={'5'} mt='15'>
  <b/> <b/> 

  <HStack maxW={'full'} alignItems='center'>
 
  <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./antecedentecrear")}>Agregar Antecedente</Button>
  <b/> <b/> 
  <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={()=>router.push("/")}>Volver</Button>
  
  </HStack>

  <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
        <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr fontSize={'25'}>

              <Td>Rut Parvulo</Td>
              <Td>Discapacidad</Td>
              <Td>Enfermedad</Td>
              <Td>Cuidado</Td>
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
export default antecedente

