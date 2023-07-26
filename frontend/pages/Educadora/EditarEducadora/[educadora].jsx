import {useState as state} from 'react'
import {BuscarEducadora, UpdateEducadora} from '../../../data/Educadora'
import { Container, Heading, Stack,  Button,  HStack} from '@chakra-ui/react'
import InputFormEdu from '../../../components/InputFormEdu'
import { useRouter} from 'next/router'
import Swal from 'sweetalert2'

export const getServerSideProps = async (context) => {
    const response = await BuscarEducadora(context.query.educadora)
    return{
        props: {
            data: response.data
        }
    }
}



const EditarEducadora = ({data}) => {
    const [educadora, setEducadora] = state(data)
    const router = useRouter()
    console.log(educadora)


      const submitEducadora = async (e) =>{
        e.preventDefault()
        const response = await UpdateEducadora(educadora._id, educadora)
        if(response.status == 200){
          Swal.fire(
            {
              icon: 'success',
              title: 'Datos actualizados',
              showConfirmButton: true,
              text: 'Los datos se actualizaron correctamente'
            }).then(() =>{
              router.push('../VistaEducadoras')
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

      const handleChange = (e) =>{
        setEducadora({
          ...educadora,
          [e.target.name]: e.target.value
        })
      }
      
    return (
      <>
        <Container maxW="container.lg" my="40">
        <Stack spacing={'5'} my={'15'}>
          <Heading as='h1' size={'2xl'} align='center' textColor={'black'}>Editar Educadora</Heading>
          <Container maxW='container.lg' marginTop={'40'}>
          <form onSubmit={submitEducadora} id="form">
            <Stack spacing={7}>
              <InputFormEdu label="Rut" type="text" name="rut" placeholder="Ingrese Rut" min={9} max={10} handlechange={handleChange} value={educadora.rut} />
              <InputFormEdu label="Nombre Completo" type="text" name="nombre" placeholder="Ingrese Nombre Completo" min={5} handlechange={handleChange} value={educadora.nombre} />
              <InputFormEdu label="Dirección" type="text" name="direccion" placeholder="Ingrese Dirección" min={5} handlechange={handleChange} value={educadora.direccion} />
              <InputFormEdu label="Telefono" type="number" name="telefono1" placeholder="Ingrese Telefono" min={8} max={9} handlechange={handleChange} value={educadora.telefono1} />
              <InputFormEdu label="Correo" type="email" name="correo" placeholder="Ingrese Correo" handlechange={handleChange} value={educadora.correo} />
              <InputFormEdu label="Fecha" type="date" name="fecha_de_nac" handlechange={handleChange} value={educadora.fecha_de_nac.substring(0,10)} />
            </Stack>
            <HStack>
              <Button colorScheme='whatsapp' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' type='submit'>Guardar</Button>
              <Button colorScheme='red' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('../VistaEducadoras')}>Cancelar</Button>
            </HStack>
            </form>
          </Container>
        </Stack>
      </Container>
      </>
    )
}

export default EditarEducadora