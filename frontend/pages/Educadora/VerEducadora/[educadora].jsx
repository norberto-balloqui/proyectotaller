import {useState as state} from 'react'
import {BuscarEducadora, DeleteEducadora} from '../../../data/Educadora'
import { Heading, Stack, Card, CardHeader, StackDivider, CardBody, Box, Button,  Container, HStack, Text} from '@chakra-ui/react'
import Swal from 'sweetalert2'
import router from 'next/router'

export const getServerSideProps = async (context) => {
    const response = await BuscarEducadora(context.query.educadora)
    return{
        props: {
            data: response.data
        }
    }
}

    const VerEducadora = ({data}) => {
        const [educadora] = state(data)

        const Eliminar= ( id) =>{
            DeleteEducadora(id)
            Swal.fire(
                {
                    icon: 'success',
                    title: 'Educadora Eliminada',
                    showConfirmButton: true,
                    text: 'La Educadora se elimino correctamente'
                }).then(()=>{
                    router.push('../VistaEducadoras')
                    
                })
            }

    return (

       <>
        <Container maxW="container.lg" my="40" >
        <Stack spacing={'5'} my={'15'}>
          <Heading as='h1' size={'2xl'} align='center' textColor={'black'}>Educadora</Heading>
          <Card  bgColor={'cyan.100'}>
            <CardHeader>
                <Heading size='lg'>{educadora.nombre}</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="rut">
                    Rut
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {educadora.rut}
                    </Text>
                </Box>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="direccion">
                    Dirección
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {educadora.direccion}
                    </Text>
                </Box>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="telefono1">
                    Telefono
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {educadora.telefono1}
                    </Text>
                </Box>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="correo">
                    Correo
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {educadora.correo}
                    </Text>
                </Box>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="fecha_de_nac">
                    Fecha de Nacimiento
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {educadora.fecha_de_nac.substring(0,10)}
                    </Text>
                </Box>
                </Stack>
            </CardBody>
        </Card>
        <HStack>
            <Button w={'full'} colorScheme="blue" textColor={"white"} onClick={()=>router.push(`../VistaEducadoras`)}>Volver</Button>
            <Button w={'full'} colorScheme="yellow" textColor={"white"} onClick={()=>router.push(`../EditarEducadora/${educadora._id}`)}>Editar</Button>
            <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>Eliminar(educadora._id)}>Eliminar</Button>
        </HStack>
        </Stack>
      </Container>
    </>
    )
}

export default VerEducadora