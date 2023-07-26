import { Container,useToast as toast,  Heading, Stack,Text , Table, Thead, Tr, Td, Tbody, Button, useDisclosure as disclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, HStack, Spacer } from '@chakra-ui/react'
import React, { useEffect as effect, useState as state} from 'react'
import {findAsistencia, findAsistenciaParvulo, getParvulos, addParvuloAsistencia, delParvuloAsistencia} from '../../../data/asistencia'
import router from 'next/router'
import SelectForm from '../../../components/SelectFormEx'
import Swal from 'sweetalert2'

export const getServerSideProps = async (context) => {
    const response = await findAsistencia(context.query)
    const response2 = await findAsistenciaParvulo()
    return {
        props: {
            asistencia: response.data,
            asistenciaParvulo: response2.data
        }
    }
}



const mostrar = ({asistencia, asistenciaParvulo }) => {
    const [pselected, setPselected] = state()
    const {isOpen, onOpen, onClose} = disclosure()
    const [parvulo, setParvulo] = state([])
    const [asisClase, setasisClase] = state({
      idAsistencia:asistencia._id,
      idParvulo:''
    })

    const contentAsistencia = () => {
      return asistenciaParvulo.asistenciaParvulo.map((ae => {
        if(ae.asistencia != null){
          if(ae.asistencia._id == asistencia._id){
            return (
              <Tr key={ae._id}>
              <Td>{ae.parvulo.nombre}</Td>
              <Td>{ae.fecha.substring(11,16)}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => deleteAsistencia(ae)}>Eliminar</Button>
              </Td>
            </Tr>
            )
          }
        }else {
          delParvuloAsistencia(ae._id)
        }
      }
      ))
    }

    const handleChange = (e) => {
      setasisClase({
        ...asisClase,
        [e.target.name]: e.target.value,
      },
      setPselected(e.target.value)
      )
      
    }

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
          delParvuloAsistencia(as._id).then(res => {
            if(res.status == '200'){
              Swal.fire(
                'Borrado!',
                'Se elimino con exito la asistencia.',
                'success'
              )
              router.reload()
            }else{
              Swal.fire(
                'Error!',
                'Ocurrio un problema al eliminar la asistencia',
                'warning'
              )
            }
          })
        }
      })
    }

    const contentSelect = () => {
      return parvulo.map((as => (
        <option value={as._id} key={as._id}>{as.nombre}</option>
      ))
      )
    }

    const submitAsistencia = (e) => {
      e.preventDefault()
      addParvuloAsistencia(asisClase).then(res => {
        if(res.status == '200'){
          toast({
            title: 'Parvulo registrado',
            status: 'success',
            duration: 2000,
            isClosable: true
          })
          router.reload()
        }else{
          toast({
            title: 'Ocurrio un error',
            status: 'warning',
            duration: 2000,
            isClosable: true
          })
        }
      })
    }

    effect(() => {
      getParvulos().then(res =>{
        setParvulo(res.data)
      })
    }, [])
    
  return (
    <Container maxW={"container.xl"}>
      <Heading as={"h1"} textAlign="center" mt={20}>Asistencia de la {asistencia.titulo}</Heading>
      <Heading as="h6" textAlign="center" mb={20} fontSize={17}>
        Asistente a cargo: {asistencia.asistente_d.nombre}
      </Heading>
      <HStack mb={10}>
        <Button colorScheme={"whatsapp"} onClick={onOpen} >Registrar asistencia</Button>
        <Spacer/>
        <Button colorScheme={"blue"} onClick={() => router.back()}>Volver</Button>
      </HStack>
      <Stack>
        <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
          <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr>
              <Td>Parvulo</Td>
              <Td className='tmh'>Hora de llegada</Td>
              <Td>Opciones</Td>
            </Tr>
          </Thead>
          <Tbody>
          {contentAsistencia()}
          </Tbody>
        </Table>
      </Stack>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Asistencia de la {asistencia.titulo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack>
            <SelectForm name="idParvulo" label="Parvulo" placeholder="Seleccione un parvulo..." handleChange={handleChange} content={contentSelect()}/>
            </HStack>


            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='whatsapp' mr={3} onClick={submitAsistencia}>
              Confirmar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>

    
    
  )
}

export default mostrar