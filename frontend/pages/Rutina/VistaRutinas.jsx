import {useEffect as effect, useState as state} from 'react'
import { Container, Table, Td, Tr, Heading, Stack, Thead, Tbody, Button} from '@chakra-ui/react';
import {BuscarRutinas, DeleteRutina} from "../../data/Rutina"
import router from 'next/router';
import Swal from 'sweetalert2';

const VistaRutinas = () => {
    const[rutinas, setRutina] = state([{
        _id: '',
        fecha: '',
        grado: '',
        educadora: '',
        actividad: '',
        evaluacion: ''
    }])

    const Eliminar= (id) =>{
        DeleteRutina(id)
        Swal.fire(
            {
              icon: 'success',
              title: 'Rutina eliminada',
              showConfirmButton: true,
              text: 'La Rutina se elimino correctamente'
            }).then(()=>{
              location.reload()
            })
    }
   const contenido = () =>{
        return rutinas.map(rutina =>{
            return (
                <Tr key={rutina._id}>
                    <Td>{rutina.fecha.substring(0,10)}</Td>
                    <Td>{rutina.actividad}</Td>
                    <Td>{rutina.evaluacion}</Td>
                    <Td><Button w={'full'} colorScheme='telegram' textColor={"white"} onClick={()=>router.push(`./VerRutina/${rutina._id}`)}>Ver</Button></Td>
                    <Td><Button w={'full'} colorScheme="yellow" textColor={"white"} onClick={()=>router.push(`./EditarRutina/${rutina._id}`)}>Editar</Button></Td>
                    <Td><Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>Eliminar(rutina._id)}>Eliminar</Button></Td>
                </Tr>
            )
        })
   }

   effect(() => {
        BuscarRutinas().then(res => {
            setRutina(res.data)
        })
    }, [])

    return (
    <>
    <Container maxW='container.xl' my="40">
        <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Listado de Rutinas</Heading>
        <Stack spacing={'7'} mt='15'>
            <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./CrearRutina/CrearRutina")}>Crear Rutina</Button>
            <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
                <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
                    <Tr fontSize={'25'}>
                        <Td>Fecha</Td>
                        <Td>Activida</Td>
                        <Td>Evaluación</Td>
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

export default VistaRutinas