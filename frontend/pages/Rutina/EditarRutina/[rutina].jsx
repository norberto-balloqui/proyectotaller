import {useState as state} from 'react'
import {BuscarRutina, UpdateRutina} from '../../../data/Rutina'
import { Container, Heading, Stack, HStack, Button, Input, FormControl, FormLabel, Textarea} from '@chakra-ui/react'
import router from 'next/router'
import Swal from 'sweetalert2'

export const getServerSideProps = async (context) => {
    const response = await BuscarRutina(context.query.rutina)
    return{
        props: {
            data: response.data
        }
    }
}

const Editar_Rutina = ({data}) => {
    const [rutina, setRutina] = state(data)
    const Consulta = (ruti)=>{
      if(ruti.educadora!=null){
          return(ruti.educadora.nombre)
      }else{
          return("Sin Educadora")
      }
  }

      const handlechange = (e) =>{
        setRutina({
          ...rutina,
          [e.target.name]: e.target.value
        })
      }

      const submitRutina = async (e) =>{
        e.preventDefault()
        const response = await UpdateRutina(rutina._id, rutina)
        if(response.status == 200){
          Swal.fire(
            {
              icon: 'success',
              title: 'Datos actualizados',
              showConfirmButton: true,
              text: 'Los datos se actualizaron correctamente'
            }).then(() =>{
              router.push('../VistaRutinas')
            })
        }else{
          Swal.fire(
            {
              icon: 'error',
              title: 'Error',
              showConfirmButton: true,
              text: 'Error al actualizar los datos'
            }
          )
        }
      }

    return (
      <Container maxW="container.lg" my='40'>
      <Stack spacing={5} my={'15'}>
        <Heading as='h1' size={'2xl'} align='center' textColor={'black'}>Editar Rutina</Heading>
        <Container maxW='container.lg' marginTop={'40'}>
        <form onSubmit={submitRutina} id="form">
          <Stack spacing={7}>
            <FormControl id="fecha">
              <FormLabel>Fecha actual</FormLabel>
              <Input variant='filled' name='fecha'value={rutina.fecha.substring(0,10)} disabled={true}/>
            </FormControl>
            <FormControl id="grado">
              <FormLabel>Grado</FormLabel>
              <Input variant='filled' name='grado' value={rutina.grado.grado} disabled={true} />
            </FormControl >
            <FormControl id="educadora">
              <FormLabel>Educadora</FormLabel>
              <Input variant='filled'name='educadora' value={Consulta(rutina)} disabled={true}/>
            </FormControl>
            <FormControl id="actividad" isRequired>
              <FormLabel>Actividad</FormLabel>
              <Textarea variant='filled' type="text" placeholder='Ingrese Actividad' name={"actividad"} minLength={8} maxLength={200} onChange={handlechange} value={rutina.actividad}/>
            </FormControl>
            <FormControl id="evaluacion">
              <FormLabel>Evaluación</FormLabel>
              <Input variant='filled' placeholder='Evaluación' name={"evaluacion"} minLength={5} onChange={handlechange} value={rutina.evaluacion}/>
            </FormControl>
          </Stack>
          <HStack>
              <Button colorScheme='whatsapp' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' type={"submit"}>Guardar</Button>
              <Button colorScheme='red' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('../VistaRutinas')}>Cancelar</Button>
          </HStack>
        </form>
        </Container>
      </Stack>
    </Container>
    )
}

export default Editar_Rutina