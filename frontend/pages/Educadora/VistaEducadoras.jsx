import {useEffect as effect, useState as state} from 'react'
import { Table, Td, Tr, Heading, Stack, Thead, Tbody, Button,Container} from '@chakra-ui/react';
import {BuscarEducadoras, DeleteEducadora} from '../../data/Educadora'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const VistaEducadoras = () => {
   
    const[educadoras, setEducadora] = state([{
        _id: '',
        rut: '',
        fecha_de_nac: '',
        nombre: '',
        direccion: '',
        telefono1: '',
        correo: ''
    }])

    const router = useRouter()

    const Eliminar= ( id) =>{
        DeleteEducadora(id)
        Swal.fire(
            {
              icon: 'success',
              title: 'Educadora Eliminada',
              showConfirmButton: true,
              text: 'La Educadora se elimino correctamente'
            }).then(()=>{
              location.reload()
            })
    }

   const contenido = () =>{
        return educadoras.map(educadora =>{
            return (
                <Tr key={educadora._id}>
                    <Td>{educadora.rut}</Td>
                    <Td>{educadora.nombre}</Td>
                    <Td>{educadora.telefono1}</Td>
                    <Td><Button w={'full'} colorScheme='telegram' textColor={"white"} onClick={()=>router.push(`./VerEducadora/${educadora._id}`)}>Ver</Button></Td>
                    <Td><Button w={'full'} colorScheme="yellow" textColor={"white"} onClick={()=>router.push(`./EditarEducadora/${educadora._id}`)}>Editar</Button></Td>
                    <Td><Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>Eliminar(educadora._id)}>Eliminar</Button></Td>
                </Tr>
            )
        })
   }
   effect(() => {
        BuscarEducadoras().then(res=>{
            setEducadora(res.data)
        })
    }, [])

    return (
    <>
    <Container maxW='container.xl' my="40">
        <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Listado de Educadoras</Heading>
        <Stack spacing={'7'} mt='15'>
            <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./CrearEducadora/CrearEducadora")}>Crear Educadora</Button>
            <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
                <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
                    <Tr fontSize={'25'}>
                        <Td>Rut</Td>
                        <Td>Nombre</Td>
                        <Td>Telefono</Td>
                        <Td>Ver</Td>
                        <Td>Editar</Td>
                        <Td>Eliminar</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {contenido()}
                </Tbody>
            </Table>
        </Stack>
    </Container>
    </>
  )
}

export default VistaEducadoras