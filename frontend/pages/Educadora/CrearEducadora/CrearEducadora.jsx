import {useState as state} from 'react'
import {CrearEducadora} from '../../../data/Educadora'
import { Heading, Stack, FormControl, FormLabel, Input, Button, Container, HStack, Text} from '@chakra-ui/react'
import InputFormEdu from '../../../components/InputFormEdu'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'


const Crear_Educadora = () => {
  const [educadora, setEducadora] = state({
    rut: '',
    fecha_de_nac: '',
    nombre: '',
    direccion: '',
    telefono1: '',
    correo: ''
  })

  const router = useRouter()

  const submitEducadora = async (e) =>{
    e.preventDefault()
    const response = await CrearEducadora(educadora)
      if(response.status == 200){
        Swal.fire(
          {
            icon: 'success',
            title: 'Educadora creada',
            showConfirmButton: true,
            text: 'La Educadora se ingreso correctamente'
          }).then(() =>{
            router.push('../VistaEducadoras')
          })
      }else{
        Swal.fire(
          {
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            text: 'Error al ingresar educadora'
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
      <Stack spacing={5} my={'15'}>
        <Heading as='h1' size={'2xl'} align='center' textColor={'black'}>Crear Educadora</Heading>
        <Container maxW='container.lg' marginTop={'40'}>
          <form onSubmit={submitEducadora} id="form">
            <Stack spacing={7} >
            <InputFormEdu label="Rut" type="text" name="rut" placeholder="Ingrese Rut" min={9} max={10} handlechange={handleChange} />
            <InputFormEdu label="Nombre Completo" type="text" name="nombre" placeholder="Ingrese Nombre Completo" min={5} handlechange={handleChange}/>
            <InputFormEdu label="Dirección" type="text" name="direccion" placeholder="Ingrese Dirección" min={5} handlechange={handleChange}/>
            <InputFormEdu label="Telefono" type="number" name="telefono1" placeholder="Ingrese Telefono" min={8} max={9} handlechange={handleChange} />
            <InputFormEdu label="Correo" type="email" name="correo" placeholder="Ingrese Correo" handlechange={handleChange} />
            <FormControl id="fecha_de_nac">
              <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input variant={'filled'} type={'date'} name={"fecha_de_nac"}  onChange={handleChange}></Input>
            </FormControl>
            </Stack>
            <HStack>
            <Button colorScheme='whatsapp' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' type={"submit"}>Crear</Button>
            <Button colorScheme='red' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('../VistaEducadoras')}>Cancelar</Button>
            </HStack>
          </form>
        </Container>
      </Stack>
    </Container>
  </>
  )
}

export default Crear_Educadora