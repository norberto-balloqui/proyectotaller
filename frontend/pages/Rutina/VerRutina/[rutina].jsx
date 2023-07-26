import {useState as state} from 'react'
import {BuscarRutina, DeleteRutina} from '../../../data/Rutina'
import { Container, Heading, Stack, Card, CardBody, Box, Text, StackDivider, HStack, Button, Skeleton} from '@chakra-ui/react'
import Swal from 'sweetalert2'
import router from 'next/router'


export const getServerSideProps = async (context) => {
    const response = await BuscarRutina(context.query.rutina)
    return{
        props: {
            data: response.data
        }
    }
}

const VerRutina = ({data}) => {
    const [rutina] = state(data)
    const Eliminar= ( id) =>{
        DeleteRutina(id)
        Swal.fire(
            {
                icon: 'success',
                title: 'Rutina eliminada',
                showConfirmButton: true,
                text: 'La Rutina se elimino correctamente'
            }).then(()=>{
                router.push('../VistaRutinas')
            })
    }

    const Consulta = (ruti)=>{
        if(ruti.educadora!=null){
            return(ruti.educadora.nombre)
        }else{
            return("Sin Educadora")
        }
    }

    return (
        <Container maxW="container.lg" my='40'>
        <Stack spacing={'5'} my={'15'}>
          <Heading as='h1' size={'2xl'} align='center' textColor={'black'}>Rutina</Heading>
          <Card bgColor={'green.100'}>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="fecha">
                    Fecha
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {rutina.fecha.substring(0,10)}
                    </Text>
                </Box>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="grado">
                    Grado
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {rutina.grado.grado}
                    </Text>
                </Box>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="educadora">
                    Educadora
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {Consulta(rutina)}
                    </Text>
                </Box>
                <Box>
                    <Heading size='md' textTransform='uppercase' name="actividad">
                    Actividad
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {rutina.actividad}
                    </Text>
                </Box><Box>
                    <Heading size='md' textTransform='uppercase' name="evaluacion">
                    Evaluación
                    </Heading>
                    <Text pt='2' fontSize='md'>
                    {rutina.evaluacion}
                    </Text>
                </Box>
                </Stack>
            </CardBody>
        </Card>
        <HStack>
            <Button w={'full'} colorScheme="blue" textColor={"white"} onClick={()=>router.push(`../VistaRutinas`)}>Volver</Button>
            <Button w={'full'} colorScheme="yellow" textColor={"white"} onClick={()=>router.push(`../EditarRutina/${rutina._id}`)}>Editar</Button>
            <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>Eliminar(rutina._id)}>Eliminar</Button>
        </HStack>
        </Stack>
      </Container>
    )
}

export default VerRutina